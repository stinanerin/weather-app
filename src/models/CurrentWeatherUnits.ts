export interface CurrentWeatherUnits {
    interval: string; // in "seconds"
    is_day: string; // empty string
    temperature: string; // in "°C"
    time: string; // in "iso8601"
    weathercode: string; // "wmo code"
    winddirection: string; // in "°"
    windspeed: string; // in "m/s"
}