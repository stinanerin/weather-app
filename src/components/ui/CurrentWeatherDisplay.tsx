import { getWeekday, formatDate } from "../../utility/helper";
import { WeatherData } from "../../models/WeatherData";

interface Props {
    weatherData: WeatherData;
}

const CurrentWeatherDisplay = ({ weatherData }: Props) => {
    return (
        <div className="current-weather-display">
            <h2 className="heading">{weatherData.location}</h2>
            <p>
                {getWeekday(weatherData.current_weather.time)}{" "}
                {formatDate(weatherData.current_weather.time)}
            </p>
            <p>{weatherData.current_weather.temperature}°</p>
        </div>
    );
};

export default CurrentWeatherDisplay;
