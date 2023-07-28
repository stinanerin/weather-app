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
                            className="forecast-card"
                        >
                            <div>
                                00:
                                {index.toString().length > 1
                                    ? index
                                    : "0" + index}
                            </div>
                            <div className="right-cell">
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
