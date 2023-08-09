import { Route, Switch } from "react-router-dom";
import App from "../App";
import DayView from "../components/DayView";

const AppRouter = () => {
    return (
        <Switch>
            <Route exact path="/">
                <App />
            </Route>{" "}
            <Route path="/day/:dayIndex">
                <DayView />
            </Route>
        </Switch>
    );
};

export default AppRouter;
