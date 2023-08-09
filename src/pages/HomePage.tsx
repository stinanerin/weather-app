import WeeklyOverview from "../components/WeeklyOverview";
import { getWeekday, formatDate } from "../utility/helper";

import { useWeatherContext } from "../utility/useWeatherContext";

const HomePage = () => {
    const { weatherData } = useWeatherContext();

    console.log(weatherData);

    if (!weatherData) {
        return <p>Loading...</p>;
    }
    return (
        <>
            <div className="current-temp-overview">
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
            <WeeklyOverview forecast={weatherData} />
        </>
    );
};

export default HomePage;
