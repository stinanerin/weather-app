import WeeklyOverview from "../components/WeeklyOverview";
import CurrentWeatherDisplay from "../components/CurrentWeatherDisplay";

import SkeletonOverview from "../skeletons/SkeletonOverview";
import CurrentDisplaySkeleton from "../skeletons/CurrentDisplaySkeleton";

import { useWeatherContext } from "../utility/useWeatherContext";

const HomePage = () => {
    const { weatherData } = useWeatherContext();

    console.log(weatherData);

    if (!weatherData) {
        return (
            <>
                <CurrentDisplaySkeleton />
                <SkeletonOverview />
            </>
        );
    }
    return (
        <>
            <CurrentWeatherDisplay weatherData={weatherData} />
            <WeeklyOverview forecast={weatherData} />
        </>
    );
};

export default HomePage;
