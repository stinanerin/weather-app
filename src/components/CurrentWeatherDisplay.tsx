import { getWeekday, formatDate } from "../utility/helper";
import { WeatherData } from "../models/WeatherData";

interface Props {
    WeatherData: WeatherData;
}

const CurrentWeatherDisplay = ({ WeatherData }: Props) => {
    return (
        <div className="current-weather-display">
            <h2 className="heading">{WeatherData.location}</h2>
            <p>
                {getWeekday(WeatherData.current_weather.time)}{" "}
                {formatDate(WeatherData.current_weather.time)}
            </p>
            <p>{WeatherData.current_weather.temperature}°</p>
        </div>
    );
};

export default CurrentWeatherDisplay;
