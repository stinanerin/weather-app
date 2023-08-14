import { Route, Switch } from "react-router-dom";
import HourlyForecastCardList from "../components/HourlyForecastCardList";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";




const AppRouter = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/day/:dayIndex" component={HourlyForecastCardList} />
            <Route path="/*" component={NotFound}/>
        </Switch>
    );
};

export default AppRouter;
