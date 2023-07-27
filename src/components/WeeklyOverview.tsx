import React from "react";
import { getWeekday, formatDate } from "../helpers/helper";

/* Props - Interface
    Passing data to components 
*/

interface WeatherObj {
    // typeannotation...
    current_weather: CurrentWeatherData;
    hourly: HourlyForecastWeatherObj;
}

interface HourlyForecastWeatherObj {
    temperature_2m: number[];
}

interface CurrentWeatherData {
    time: string;
    temperature: number;
}

interface Props {
    // typeannotation...
    forecast: WeatherObj;
}

const WeeklyOverview = ({ forecast }: Props) => {
    //todo break out funciton
    const currentTime = new Date(forecast.current_weather.time);

    console.log(currentTime);

    const tempArr = forecast.hourly.temperature_2m;

    const weekTempArr = [];

    for (let i = 0; i < tempArr.length; i += 24) {
        const dayTempArr = tempArr.slice(i, i + 24);
        weekTempArr.push({
            date: new Date(
                currentTime.setDate(
                    currentTime.getDate() + (i > 0 ? i - 23 : i)
                )
            ),
            dayTempArr,
        });
    }
    console.log(weekTempArr);

    return (
        <ul className="weekly-forecast">
            {weekTempArr.map((day) => {
                return (
                    <li key={day.dayTempArr.join(",")} className="forecast-card">
                        <div className="date-cell">
                            <h3> {getWeekday(day.date)}</h3>
                            <p> {formatDate(day.date)}</p>
                        </div>
                        <div className="temp-cell">
                            <div>{Math.max(...day.dayTempArr)}°</div>
                            <div>{Math.min(...day.dayTempArr)}°</div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default WeeklyOverview;
