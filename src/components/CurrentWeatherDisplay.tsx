import { getWeekday, formatDate } from "../utility/helper";


interface Props {
    weatherData: {
        location: string;
        current_weather: CurrentWeatherData;
    }
}

interface CurrentWeatherData {
    time: string;
    temperature: number;
}


const CurrentWeatherDisplay = ({ weatherData }: Props) => {
  return (
    <div className="current-weather-display">
        <h2 className="heading">
            {/* todo is it in the weather arr iobject already?{location} */}
            {weatherData.location}
        </h2>
        <p>
            {getWeekday(weatherData.current_weather.time)}{" "}
            {formatDate(weatherData.current_weather.time)}
        </p>
        <p>{weatherData.current_weather.temperature}°</p>
    </div>
  )
}

export default CurrentWeatherDisplay