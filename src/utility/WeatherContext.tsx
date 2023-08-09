import { createContext, useState, ReactNode } from "react";
// import { useWeatherContext } from "./useWeatherContext";

interface WeatherContextType {
    weatherData: WeatherData | null;
    setWeatherData: (data: WeatherData | null) => void;
}
interface CurrentWeatherData {
    time: string;
    temperature: number;
}

interface WeatherData {
    current_weather: CurrentWeatherData;
    location: string;
    hourly: {
        temperature_2m: number[];
        weathercode: number[];
        windspeed_10m: number[];
        rain: number[];
        pressure_msl: number[];
        relativehumidity_2m: number[];
        visibility: number[];
    };
    daily: {
        // [key: string]:  number[];
        weathercode: number[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        rain_sum: number[];
        uv_index_max: number[];
        sunrise: number[];
        sunset: number[];
        time: string[];
    };
    hourly_units: {
        [key: string]: string;
    };
}
export const WeatherContext = createContext<WeatherContextType | undefined>(
    undefined
);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    return (
        <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
            {children}
        </WeatherContext.Provider>
    );
};
