import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { getLocation } from "./utility/helper";
import { fetchData } from "./utility/api";

import AppRouter from "./utility/AppRouter";

// import WeeklyOverview from "./components/WeeklyOverview";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { useWeatherContext } from "./utility/useWeatherContext";

const App = () => {

    const { weatherData, setWeatherData } = useWeatherContext();
    // const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    const [location, setLocation] = useState<string | null>(null);

    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    const handleSearchResult = (
        location: string,
        latitude: number,
        longitude: number
    ) => {
        setLatitude(latitude);
        setLongitude(longitude);
        setLocation(location);
    };

    const BASE_URL =
        "https://api.open-meteo.com/v1/forecast?current_weather=true&hourly=winddirection_10m,relativehumidity_2m,pressure_msl,visibility,rain,temperature_2m,apparent_temperature,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,rain_sum,showers_sum,snowfall_sum&windspeed_unit=ms&timezone=GMT";

    useEffect(() => {
        const fetchCurrentLocationWeatherData = async () => {
            try {
                const success = async (pos: GeolocationPosition) => {
                    const crd = pos.coords;

                    const city = await getLocation(crd.latitude, crd.longitude);
                    // Update the latitude and longitude state variables
                    setLocation(city);
                    setLatitude(crd.latitude);
                    setLongitude(crd.longitude);
                };

                const error = (err: GeolocationPositionError) => {
                    //todo - if user does not allow location to be determined
                    console.warn(`ERROR(${err.code}): ${err.message}`);
                };

                navigator.geolocation.getCurrentPosition(success, error);
            } catch (error) {
                console.warn("Error while fetching weather data", error);
            }
        };
        // Fetch weather data when the component mounts
        fetchCurrentLocationWeatherData();
    }, []);

   




    useEffect(() => {
        // When latitude or longitude changes, fetch weather data
        if (latitude !== null && longitude !== null) {

            const getWeatherData = async () => {
                try {
                    const url = `${BASE_URL}&latitude=${latitude}&longitude=${longitude}`;
                    const res = await fetchData(url);

                    if (res === undefined || res.status !== 200) {
                        throw new Error("Failed to fetch weather data");
                    }
                    const weatherDataWithLocation = {
                        ...res.data,
                        location: location,
                    };
                    setWeatherData(weatherDataWithLocation);
                } catch (error) {
                    console.warn("Error while fetching weather data", error);
                } 
            };

            getWeatherData();
        }
        // -->  ignore the missing dependency warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [latitude, longitude]);

    return (
        <Router>
            <Header onSearchResultClick={handleSearchResult} />
            <div className="app-container">
                <AppRouter />
            </div>
            <Footer />
        </Router>
    );
};

export default App;
