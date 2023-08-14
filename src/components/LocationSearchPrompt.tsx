import Alert from "./Alert/Alert";

const LocationSearchPrompt = () => {
    const msg = `We understand that sometimes granting location permission can be
    a concern. No worries! You can still get
    weather information by searching for a specific location.
    `;

    return (
        <div className="elem-center">
            <h1 className="weather-heading">
                🌦️ Welcome to our Weather Application! 🌈
            </h1>
            <Alert message={msg} heading="ℹ️  Location Access Not Granted" />
        </div>
    );
};

export default LocationSearchPrompt;
