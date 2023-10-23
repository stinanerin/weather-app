import { createContext, useState, ReactNode } from "react";
import { WeatherData } from "../models/WeatherData";

interface WeatherContextType {
    weatherData: WeatherData | null;
    setWeatherData: (data: WeatherData | null) => void;
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
