import { Route, Switch } from "react-router-dom";
import DayView from "../components/DayView";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";




const AppRouter = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/day/:dayIndex" component={DayView} />
            <Route path="/*" component={NotFound}/>
        </Switch>
    );
};

export default AppRouter;
