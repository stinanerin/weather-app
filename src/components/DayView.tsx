import {
    getWeekday,
    formatDate,
    datesAreEqual,
    calculateMean,
} from "../utility/helper";
import { determineWeatherIcon } from "../utility/weatherIcons";

import ForecastDescriptors from "./ForecastDescriptors";
import InfoCard from "./InfoCard";
import LoadingScreen from "./LoadingScreen";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useParams } from "react-router-dom";
import { useWeatherContext } from "../utility/useWeatherContext";

interface weatherDay {
    hour: string | number;
    temp: number;
    rain: number;
    wind_speed: number;
    weather_code: number;
}

//todo! if weatherData is null amke an api call? in case user direclty navigates to a day/:idnex page
interface WeatherObj {
    // typeannotation...
    current_weather: CurrentWeatherData;
    hourly: HourlyForecastWeatherObj;
    //!Nytt
    daily: DailyWeatherSumsObj;
    hourly_units: {
        [key: string]: string;
    };
}

interface CurrentWeatherData {
    time: string;
    temperature: number;
}

interface HourlyForecastWeatherObj {
    temperature_2m: number[];
    weathercode: number[];
    windspeed_10m: number[];
    rain: number[];
    pressure_msl: number[];
    relativehumidity_2m: number[];
    visibility: number[];
}
interface DailyWeatherSumsObj {
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    rain_sum: number[];
    uv_index_max: number[];
    sunrise: number[];
    sunset: number[];
    time: string[];
}

//!Nytt

type MoreInfo = {
    uv: { data: number; unit: string };
    pressure: { data: number; unit: string };
    visibility: { data: number; unit: string };
    humidity: { data: number; unit: string };
    sunrise: { data: string; unit: string };
    sunset: { data: string; unit: string };
};

const DayView = () => {
    const { weatherData } = useWeatherContext();

    //todo: move function
    const formatHourlyTemperatureData = (forecast: WeatherObj) => {
        const currentTime = new Date(forecast.current_weather.time);

        const {
            temperature_2m,
            weathercode,
            windspeed_10m,
            rain,
            pressure_msl,
            visibility,
            relativehumidity_2m,
        } = forecast.hourly;

        const weekTempArr = [];

        for (let i = 0; i < rain.length; i += 24) {
            const dayTempArr = temperature_2m.slice(i, i + 24);
            const dayWeatherCodeArr = weathercode.slice(i, i + 24);
            const dayWindspeedArr = windspeed_10m.slice(i, i + 24);
            const dayRainArr = rain.slice(i, i + 24);
            const dayPressureArr = pressure_msl.slice(i, i + 24);
            const dayVisibilityArr = visibility.slice(i, i + 24);
            const dayHumidityArr = relativehumidity_2m.slice(i, i + 24);

            const currentDate = new Date(currentTime);
            currentDate.setDate(currentDate.getDate() + i / 24);

            weekTempArr.push({
                date: currentDate.toISOString(),
                more_info: {
                    uv: {
                        data: forecast.daily.uv_index_max[i / 24],
                        unit: "",
                    },
                    pressure: {
                        data: Math.round(calculateMean(dayPressureArr)),
                        unit: forecast.hourly_units.pressure_msl,
                    },
                    visibility: {
                        data: Math.round(calculateMean(dayVisibilityArr)),
                        unit: forecast.hourly_units.visibility,
                    },
                    humidity: {
                        data: Math.round(calculateMean(dayHumidityArr)),
                        unit: forecast.hourly_units.relativehumidity_2m,
                    },
                    // toString() for typescript
                    sunrise: {
                        data: forecast.daily.sunrise[i / 24]
                            .toString()
                            .slice(11),
                        unit: "",
                    },
                    sunset: {
                        data: forecast.daily.sunset[i / 24]
                            .toString()
                            .slice(11),
                        unit: "",
                    },
                },
                dayTempArr,
                dayWeatherCodeArr,
                dayWindspeedArr,
                dayRainArr,
            });
        }
        return weekTempArr;
    };

    const weeklyForecast = weatherData?.hourly
        ? formatHourlyTemperatureData(weatherData)
        : [];
    // Gets day index from URL parameter
    const { dayIndex } = useParams<{ dayIndex: string }>();
    const parsedDayIndex = parseInt(dayIndex, 10);

    console.log("weeklyForecast", weeklyForecast);

    if (!weatherData) {
        return <LoadingScreen />;
    }

    // Destructure the weatherData object
    const {
        date,
        dayTempArr,
        dayWeatherCodeArr,
        dayRainArr,
        dayWindspeedArr,
        more_info,
    } = weeklyForecast[parsedDayIndex];

    const Today = new Date();

    const todayisBeingRendered = datesAreEqual(new Date(date), Today);
    const currentTime = +Today.getHours();

    const dayweatherArr = dayTempArr
        .map((temp, index) => {
            return todayisBeingRendered && index < currentTime
                ? null
                : {
                      hour: index.toString().length > 1 ? index : "0" + index,
                      temp: temp,
                      rain: dayRainArr[index],
                      wind_speed: Math.round(dayWindspeedArr[index]),
                      weather_code: dayWeatherCodeArr[index],
                  };
            // Think of easy way that you actually understand as to not iterate through array twice
        })
        .filter((item): item is weatherDay => item !== null) as weatherDay[];

    console.log("dayweatherArr", dayweatherArr);

    const infoKeys = Object.keys(more_info);

    console.log("infoKeys", infoKeys);

    return (
        <div className="forecast-wrapper">
            <h2 className="heading">
                <span>{getWeekday(date)}</span>
                <span>{formatDate(date)}</span>
            </h2>

            <ForecastDescriptors showAdditionalHeadings={true} />

            <ul className="hourly-forecast">
                <>
                    {dayweatherArr.map(
                        (
                            {
                                hour,
                                temp,
                                rain,
                                wind_speed,
                                weather_code,
                            }: weatherDay,
                            index
                        ) => {
                            return (
                                <li
                                    //todo? change key
                                    key={index}
                                    className="forecast-card"
                                >
                                    <div className="left-cell">
                                        {hour}
                                        :00
                                    </div>
                                    <div className="right-cell">
                                        <div className="wind-cell">
                                            {wind_speed}
                                        </div>
                                        <div className="rain-cell">{rain}</div>
                                        <FontAwesomeIcon
                                            icon={determineWeatherIcon(
                                                weather_code
                                            )}
                                        />
                                        <div>{temp}°</div>
                                    </div>
                                </li>
                            );
                        }
                    )}
                </>
            </ul>
            <div>
                <h2 className="heading">Other info</h2>
                <div className="more-info-wrapper">
                    {infoKeys.map((key) => {
                        return <InfoCard
                            key={key}
                            heading={key}
                            data={more_info[key as keyof MoreInfo].data}
                            unit={more_info[key as keyof MoreInfo].unit}
                        />;
                    })}
                </div>

                {/*todo:
                 * sunset - sunrise icons
                 * all headings fixed
                 * add units for pressure and so on
                 */}
            </div>
        </div>
    );
};

export default DayView;
