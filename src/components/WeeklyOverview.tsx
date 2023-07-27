import { getWeekday, formatDate, getMostFrequentNum } from "../utility/helper";

import { determineWeatherIcon } from "../utility/weatherIcons";

//todo? Icons - move?
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

/* Props - Interface
 * Enables passing data to components
 */

interface WeatherObj {
    // typeannotation...
    current_weather: CurrentWeatherData;
    hourly: HourlyForecastWeatherObj;
}

interface HourlyForecastWeatherObj {
    temperature_2m: number[];
    weathercode: number[];
}

interface CurrentWeatherData {
    time: string;
    temperature: number;
}

interface Props {
    // typeannotation...
    forecast: WeatherObj;
}

const generateWeeklyTemperatureData = (forecast: WeatherObj) => {
    const currentTime = new Date(forecast.current_weather.time);

    console.log(currentTime);

    const tempArr = forecast.hourly.temperature_2m;

    const weathercodeArr = forecast.hourly.weathercode;

    const weekTempArr = [];

    for (let i = 0; i < tempArr.length; i += 24) {
        const dayTempArr = tempArr.slice(i, i + 24);

        const dayWeatherCodeArr = weathercodeArr.slice(i, i + 24);

        const currentDate = new Date(currentTime);
        currentDate.setDate(currentDate.getDate() + i / 24);

        weekTempArr.push({
            date: currentDate.toISOString(),
            dayTempArr,
            dayWeatherCodeArr,
        });
    }
    return weekTempArr;
};

const WeeklyOverview = ({ forecast }: Props) => {
    const weeklyForecast = generateWeeklyTemperatureData(forecast);

    console.log(weeklyForecast);

    return (
        <ul className="weekly-forecast">
            {weeklyForecast.map((day) => {
                const weatherCode = getMostFrequentNum(day.dayWeatherCodeArr);
                const icon: IconProp | undefined = determineWeatherIcon(
                    typeof weatherCode === "number" ? weatherCode : 0
                );

                return (
                    <li
                        //todo? change key
                        key={day.dayTempArr.join(",")}
                        className="forecast-card"
                    >
                        <div className="date-cell">
                            <h3> {getWeekday(day.date)}</h3>
                            <p> {formatDate(day.date)}</p>
                        </div>
                        <div className="weather-cell">
                            {icon ? <FontAwesomeIcon icon={icon} /> : null}

                            <div className="temp-cell">
                                <p>{Math.max(...day.dayTempArr)}°</p>
                                <p>{Math.min(...day.dayTempArr)}°</p>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default WeeklyOverview;
