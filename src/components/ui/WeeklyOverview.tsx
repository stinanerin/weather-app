import { Link } from "react-router-dom";

import ForecastDescriptors from "./ForecastDescriptors";

import { getWeekday, formatDate } from "../../utility/helper";

import { determineWeatherIcon } from "../../utility/weatherIcons";

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

import { WeatherData } from "../models/WeatherData";

const WeeklyOverview = ({ forecast }: { forecast: WeatherData }) => {
    const {
        temperature_2m_max,
        temperature_2m_min,
        weathercode,
        rain_sum,
        time,
    } = forecast.daily;

    return (
        <>
            <ForecastDescriptors showAdditionalHeadings={false} />

            <ul className="weekly-forecast">
                {time.map((day, index) => {
                    const icon: IconProp | undefined = determineWeatherIcon(
                        weathercode[index]
                    );
                    return (
                        <li key={day + index}>
                            <Link
                                to={`/day/${index}`}
                                className="forecast-card"
                            >
                                {" "}
                                {/* Link to day view */}
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
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default WeeklyOverview;
