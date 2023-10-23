import { WeatherData } from "../models/WeatherData"
import { calculateMean } from "./helper"

export const createWeekTempArr = (forecast: WeatherData) => {
    const currentTime = new Date(forecast.current_weather.time);

    const {
        temperature_2m,
        weathercode,
        windspeed_10m,
        rain,
        pressure_msl,
        visibility,
        relativehumidity_2m,
    } = forecast.hourly;

    const weekTempArr = [];

    for (let i = 0; i < rain.length; i += 24) {
        const dayTempArr = temperature_2m.slice(i, i + 24);
        const dayWeatherCodeArr = weathercode.slice(i, i + 24);
        const dayWindspeedArr = windspeed_10m.slice(i, i + 24);
        const dayRainArr = rain.slice(i, i + 24);
        const dayPressureArr = pressure_msl.slice(i, i + 24);
        const dayVisibilityArr = visibility.slice(i, i + 24);
        const dayHumidityArr = relativehumidity_2m.slice(i, i + 24);

        const currentDate = new Date(currentTime);
        currentDate.setDate(currentDate.getDate() + i / 24);

        weekTempArr.push({
            date: currentDate.toISOString(),
            more_info: {
                uv: {
                    data: forecast.daily.uv_index_max[i / 24],
                    unit: "",
                },
                pressure: {
                    data: Math.round(calculateMean(dayPressureArr)),
                    unit: forecast.hourly_units.pressure_msl,
                },
                visibility: {
                    data: Math.round(calculateMean(dayVisibilityArr)),
                    unit: forecast.hourly_units.visibility,
                },
                humidity: {
                    data: Math.round(calculateMean(dayHumidityArr)),
                    unit: forecast.hourly_units.relativehumidity_2m,
                },
                // toString() for typescript
                sunrise: {
                    data: forecast.daily.sunrise[i / 24]
                        .toString()
                        .slice(11),
                    unit: "",
                },
                sunset: {
                    data: forecast.daily.sunset[i / 24]
                        .toString()
                        .slice(11),
                    unit: "",
                },
            },
            dayTempArr,
            dayWeatherCodeArr,
            dayWindspeedArr,
            dayRainArr,
        });
    }
    return weekTempArr;
};
