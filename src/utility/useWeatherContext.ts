
import { useContext } from 'react';

import { WeatherContext } from './WeatherContext'; // Import WeatherContext from the correct path

export const useWeatherContext = () => {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error('useWeatherContext must be used within a WeatherProvider');
    }
    return context;
};
