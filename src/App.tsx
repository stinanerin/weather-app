import { useEffect, useState, useRef } from "react";
import { HashRouter as Router } from "react-router-dom";

import { getLocation } from "./utility/helper";
import { fetchData } from "./utility/api";

import AppRouter from "./utility/AppRouter";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { SkipToContent } from "./components/ui/SkipToContent";

import { useWeatherContext } from "./utility/useWeatherContext";

const App = () => {
    const { setWeatherData } = useWeatherContext();

    const [location, setLocation] = useState<string | null>(null);

    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    const mainRef = useRef<HTMLDivElement>(null);

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
                const errorCallback = (err: GeolocationPositionError) => {
                    console.warn(`ERROR(${err.code}): ${err.message}`);
                    // As using hashrouter instead of browserrouter due to netlify issue
                    // Need to us window.locaiton.has instead of useHistory() - history.push(/:route)
                    window.location.hash = "/location-not-granted"; // Use window.location.hash to navigate
                };
                navigator.geolocation.getCurrentPosition(
                    success,
                    errorCallback
                );
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
            <SkipToContent refElem={mainRef}></SkipToContent>
            <Header onSearchResultClick={handleSearchResult} />
            <main ref={mainRef} className="app-container" tabIndex={0}>
                <AppRouter />
            </main>
            <Footer />
        </Router>
    );
};

export default App;
