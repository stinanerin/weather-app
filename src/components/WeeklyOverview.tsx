import { useState } from "react";

import ForecastDescriptors from "./ForecastDescriptors";
import DayView from "./DayView";

import { getWeekday, formatDate, calculateMean } from "../utility/helper";

import { determineWeatherIcon } from "../utility/weatherIcons";

//todo? Icons - move? to global app.tsx?
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
    faCloudSun,
    faCloud,
    faCloudRain,
    faCloudBolt,
    faSnowflake,
    faSun,
    faCloudShowersHeavy,
} from "@fortawesome/free-solid-svg-icons";
library.add(
    faCloudSun,
    faCloud,
    faCloudRain,
    faCloudBolt,
    faSnowflake,
    faSun,
    faCloudShowersHeavy
);

/* Interface:
 * Enables passing data to components
 */

interface Props {
    // Type annotation
    forecast: WeatherObj;
}
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
//!Nytt
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
                sunrise: { data: forecast.daily.sunrise[i / 24].toString().slice(11) },
                sunset: { data: forecast.daily.sunset[i / 24].toString().slice(11) },
            },
            dayTempArr,
            dayWeatherCodeArr,
            dayWindspeedArr,
            dayRainArr,
        });
    }
    return weekTempArr;
};

const WeeklyOverview = ({ forecast }: Props) => {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);

    const weeklyForecast = formatHourlyTemperatureData(forecast);

    console.log(weeklyForecast);

    const {
        temperature_2m_max,
        temperature_2m_min,
        weathercode,
        rain_sum,
        time,
    } = forecast.daily;

    return (
        <>
            {selectedDate !== null ? (
                <DayView WeatherData={weeklyForecast[selectedDate]} />
            ) : (
                <>
                    <ForecastDescriptors showAdditionalHeadings={false} />

                    <ul className="weekly-forecast">
                        {time.map((day, index) => {
                            const icon: IconProp | undefined =
                                determineWeatherIcon(weathercode[index]);
                            return (
                                <li
                                    onClick={() => {
                                        setSelectedDate(index);
                                    }}
                                    //todo? change key
                                    key={day}
                                    className="forecast-card"
                                >
                                    <div className="date-cell">
                                        <h3> {getWeekday(day)}</h3>
                                        <p> {formatDate(day)}</p>
                                    </div>
                                    <div className="weather-cell">
                                        <div className="rain-cell">
                                            {rain_sum[index]}
                                        </div>
                                        {icon ? (
                                            <FontAwesomeIcon icon={icon} />
                                        ) : null}
                                        <div className="temp-cell">
                                            <p>{temperature_2m_max[index]}°</p>
                                            <p>{temperature_2m_min[index]}°</p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </>
    );
};

export default WeeklyOverview;
