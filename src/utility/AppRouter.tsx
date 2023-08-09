import { Route, Switch } from "react-router-dom";
import DayView from "../components/DayView";
import HomePage from "../pages/HomePage";

const AppRouter = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/day/:dayIndex" component={DayView} />
        </Switch>
    );
};

export default AppRouter;
