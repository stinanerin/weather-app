import { CurrentWeatherData } from "./CurrentWeatherData";
import { CurrentWeatherUnits } from "./CurrentWeatherUnits";
import { DailyData } from "./DailyData";
import { DailyUnits } from "./DailyUnits";
import { HourlyData } from "./HourlyData";
import { HourlyUnits } from "./HourlyUnits";


export interface WeatherData {
    current_weather: CurrentWeatherData;
    current_weather_units: CurrentWeatherUnits;
    daily: DailyData;
    daily_units: DailyUnits;
    hourly: HourlyData;
    hourly_units: HourlyUnits;
    latitude: number;
    location: string;
    longitude: number;
    timezone: string;
    timezone_abbreviation: string;
    utc_offset_seconds: number;
    elevation: number;
}

