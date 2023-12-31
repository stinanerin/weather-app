import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/style.scss";

import { WeatherProvider } from "./utility/WeatherContext";


ReactDOM.createRoot(document.getElementById("root")!).render(
    <WeatherProvider>
        <App />
    </WeatherProvider>
);
