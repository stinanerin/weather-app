import { useState } from "react";

import ForecastDescriptors from "./ForecastDescriptors";
import DayView from "./DayView";

import { getWeekday, formatDate } from "../utility/helper";

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
    // Typeannotation
    forecast: WeatherObj;
}
interface WeatherObj {
    // typeannotation...
    current_weather: CurrentWeatherData;
    hourly: HourlyForecastWeatherObj;
    //!Nytt
    daily: dailyWeatherSumsObj;
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
}
//!Nytt
interface dailyWeatherSumsObj {
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    rain_sum: number[];
    uv_index_max: number[];
    time: string[];
}

const formatHourlyTemperatureData = (forecast: WeatherObj) => {
    const currentTime = new Date(forecast.current_weather.time);

    const tempArr = forecast.hourly.temperature_2m;
    const weatherCodeArr = forecast.hourly.weathercode;
    const windSpeedArr = forecast.hourly.windspeed_10m;
    const rainArr = forecast.hourly.rain;

    const weekTempArr = [];

    console.log(forecast.daily.uv_index_max)


    for (let i = 0; i < tempArr.length; i += 24) {
        const dayTempArr = tempArr.slice(i, i + 24);

        console.log(i / 24)

        const dayWeatherCodeArr = weatherCodeArr.slice(i, i + 24);
        const dayWindspeedArr = windSpeedArr.slice(i, i + 24);
        const dayRainArr = rainArr.slice(i, i + 24);

        const currentDate = new Date(currentTime);
        currentDate.setDate(currentDate.getDate() + i / 24);

        weekTempArr.push({
            date: currentDate.toISOString(),
            uv_index: forecast.daily.uv_index_max[i / 24],
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

    console.log(weeklyForecast)

    const { temperature_2m_max, temperature_2m_min, weathercode, rain_sum, time } =
        forecast.daily;

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
                                        <div className="rain-cell">{rain_sum[index]}</div>
                                        {icon ? (
                                            <FontAwesomeIcon icon={icon} />
                                        ) : null}
                                        <div className="temp-cell">
                                            <p>
                                                {temperature_2m_max[index]}°
                                            </p>
                                            <p>
                                                {temperature_2m_min[index]}°
                                            </p>
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
