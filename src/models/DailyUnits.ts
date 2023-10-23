
export interface DailyUnits {
    apparent_temperature_min: string; // in "°C"
    rain_sum: string; // in "mm"
    showers_sum: string; // in "mm"
    snowfall_sum: string; // in "cm"
    sunrise: string; // in "iso8601"
    sunset: string; // in "iso8601"
    temperature_2m_max: string; // in "°C"
    temperature_2m_min: string; // in "°C"
    time: string; // in "iso8601"
    uv_index_max: string; // empty string
    weathercode: string; // "wmo code"
}