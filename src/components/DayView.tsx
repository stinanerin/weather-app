import { getWeekday } from "../utility/helper";
import { determineWeatherIcon } from "../utility/weatherIcons";

import ForecastDescriptors from "./ForecastDescriptors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    weatherData: WetherObject;
}

interface WetherObject {
    date: string;
    dayTempArr: number[];
    dayWeatherCodeArr: number[];
    dayRainArr: number[];
    dayWindspeedArr: number[];
}

const DayView = ({ weatherData }: Props) => {
    console.log(weatherData);
    return (
        <>
            <h2>{getWeekday(weatherData.date)}</h2>

            <ForecastDescriptors showAdditionalHeadings={true}/>

            <ul className="hourly-forecast">
                {weatherData.dayTempArr.map((temp, index) => {
                    return (
                        <li
                            //todo? change key
                            key={index}
                            className="forecast-card">

                            
                            <div>
                                {index.toString().length > 1
                                    ? index
                                    : "0" + index}:00
                            </div>
                            <div className="right-cell">

                                <div className="wind-cell">
                                    {weatherData.dayWindspeedArr[index]}
                                </div>
                                <div className="rain-cell">
                                    {weatherData.dayRainArr[index]}
                                </div>
                                <FontAwesomeIcon
                                    icon={determineWeatherIcon(
                                        weatherData.dayWeatherCodeArr[index]
                                    )}
                                />
                                <div>{temp}°</div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default DayView;
