import { getWeekday, formatDate, datesAreEqual } from "../../utility/helper";
import { determineWeatherIcon } from "../../utility/weatherIcons";
import { createWeekTempArr } from "../../utility/format";

import ForecastDescriptors from "./ForecastDescriptors";
import { MoreInfoWrapper } from "./MoreInfoWrapper";

import HourlyForecastListSkeleton from "../skeletons/HourlyForecastListSkeleton";
import MoreInfoSectionSkeleton from "../skeletons/MoreInfoSectionSkeleton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useParams } from "react-router-dom";
import { useWeatherContext } from "../../utility/useWeatherContext";

interface weatherDay {
    hour: string | number;
    temp: number;
    rain: number;
    wind_speed: number;
    weather_code: number;
}

const DayView = () => {
    const { weatherData } = useWeatherContext();

    const weeklyForecast = weatherData?.hourly
        ? createWeekTempArr(weatherData)
        : [];

    const { dayIndex } = useParams<{ dayIndex: string }>();
    const parsedDayIndex = parseInt(dayIndex, 10);

    const Today = new Date();
    const currentTime = +Today.getHours();

    if (!weatherData) {
        // If !weatherData - generete skeleton loading screens
        // if the currently rendered date is today, limit amount of skeletons to X-times remaining hours of the day
        // Ohterwise, just do 24
        const skeletonLimit = parsedDayIndex === 0 ? 24 - currentTime : 24;

        return (
            <>
                <HourlyForecastListSkeleton limit={skeletonLimit} />
                <MoreInfoSectionSkeleton />
            </>
        );
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

    const todayisBeingRendered = datesAreEqual(new Date(date), Today);

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
                                <li key={index} className="forecast-card">
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
            <MoreInfoWrapper moreInfo={more_info} />
        </div>
    );
};

export default DayView;
