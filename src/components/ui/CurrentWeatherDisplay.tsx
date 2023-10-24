import { getWeekday, formatDate } from "../../utility/helper";
import { WeatherData } from "../../models/WeatherData";

interface Props {
    weatherData: WeatherData;
}

const CurrentWeatherDisplay = ({ weatherData }: Props) => {
    return (
        <div className="current-weather-display">
            <p className="temp">{weatherData.current_weather.temperature}°</p>
            <p>
                {getWeekday(weatherData.current_weather.time)}{" "}
                {formatDate(weatherData.current_weather.time)}
            </p>
        </div>
    );
};

export default CurrentWeatherDisplay;
