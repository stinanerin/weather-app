import { Route, Switch } from "react-router-dom";
import HourlyForecastCardList from "../components/HourlyForecastCardList";
import LocationSearchPrompt from "../components/LocationSearchPrompt";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import ScrollToTop from "./ScrollToTop";


const AppRouter = () => {
    return (
        <>
            <ScrollToTop />

            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/day/:dayIndex" component={HourlyForecastCardList} />
                <Route exact path="/location-not-granted" component={LocationSearchPrompt} />
                <Route path="/*" component={NotFound}/>
            </Switch>
        </>
        );
};

export default AppRouter;
