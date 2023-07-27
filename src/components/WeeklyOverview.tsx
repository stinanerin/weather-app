import { getWeekday, formatDate } from "../helpers/helper";

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

    const weekTempArr = [];

    for (let i = 0; i < tempArr.length; i += 24) {
        const dayTempArr = tempArr.slice(i, i + 24);
        const currentDate = new Date(currentTime);
        currentDate.setDate(currentDate.getDate() + i / 24);
        weekTempArr.push({
            date: currentDate.toISOString(),
            dayTempArr,
        });
    }
    return weekTempArr
};

const WeeklyOverview = ({ forecast }: Props) => {

    const weeklyForecast = generateWeeklyTemperatureData(forecast);

    return (
        <ul className="weekly-forecast">
            {weeklyForecast.map((day) => {
                return (
                    <li
                        key={day.dayTempArr.join(",")}
                        className="forecast-card"
                    >
                        <div className="date-cell">
                            <h3> {getWeekday(day.date)}</h3>
                            <p> {formatDate(day.date)}</p>
                        </div>
                        <div className="temp-cell">
                            <p>{Math.max(...day.dayTempArr)}°</p>
                            <p>{Math.min(...day.dayTempArr)}°</p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default WeeklyOverview;
