import { useEffect, useState } from "react";
import axios from "axios";

import { getLocation, fetchData } from "./helpers/helper";

// Define the type for the location data
interface LocationData {
    locality: string;
    city: string;
    // Add other location details here if needed
}

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState<LocationData | null>(null);

    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    const BASE_URL =
        "https://api.open-meteo.com/v1/forecast?current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m";

    useEffect(() => {
        // Fetch weather data when the component mounts
        fetchWeatherData();
    }, []);

    const fetchWeatherData = async () => {
        try {
            const success = async (pos: GeolocationPosition) => {
                const crd = pos.coords;

                // Update the latitude and longitude state variables
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

    useEffect(() => {
        // When latitude or longitude changes, fetch weather data
        if (latitude !== null && longitude !== null) {
            setIsLoading(true);

            const getWeatherData = async () => {
                try {
                    const url = `${BASE_URL}&latitude=${latitude}&longitude=${longitude}`
                    const res = await fetchData(url)

                    if (res === undefined || res.status !== 200 ) {
                        throw new Error("Failed to fetch weather data");
                    }
                    setWeatherData(res.data);
                    console.log("weather data", res.data);
                } catch (error) {
                    console.warn("Error while fetching weather data", error);
                } finally {
                    setIsLoading(false);
                }
            };

            getWeatherData();

            const getLocationData = async () => {
                try {
                    const locationData = await getLocation(longitude, latitude);
                    setLocation(locationData);
                } catch (error) {
                    console.warn("Error while fetching location data", error);
                }
            };
            getLocationData();
        }
    }, [latitude, longitude]);

    return (
        <div className="app-container">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                weatherData && (
                    <>
                        {location && (
                            <>
                                <h2>
                                    {location.locality}, {location.city}
                                </h2>
                            </>
                        )}{" "}
                    </>
                )
            )}
        </div>
    );
};

export default App;
