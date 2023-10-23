import Alert from "./Alert/Alert";
import { useWeatherContext } from "../utility/useWeatherContext";
import { useEffect } from "react";

const LocationSearchPrompt = () => {
    const { weatherData } = useWeatherContext();

    useEffect(() => {
        if (weatherData) {
            // Redirect the user to the main route if weatherData is available
            window.location.hash = "/";
        }
    }, [weatherData]);

    const msg = `We understand that sometimes granting location permission can be
    a concern. No worries! You can still get
    weather information by searching for a specific location.
    `;

    return (
        <div className="elem-center">
            <Alert message={msg} heading="ℹ️  Location Access Not Granted" />
        </div>
    );
};

export default LocationSearchPrompt;
