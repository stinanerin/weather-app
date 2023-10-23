import WeeklyOverview from "../components/ui/WeeklyOverview";
import CurrentWeatherDisplay from "../components/ui/CurrentWeatherDisplay";

import SkeletonOverview from "../components/skeletons/SkeletonOverview";
import CurrentDisplaySkeleton from "../components/skeletons/CurrentDisplaySkeleton";

import { useWeatherContext } from "../utility/useWeatherContext";

const HomePage = () => {
    const { weatherData } = useWeatherContext();

    // console.log(weatherData);

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
