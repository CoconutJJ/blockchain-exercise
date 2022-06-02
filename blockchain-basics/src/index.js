import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import { LotteryContextProvider } from "./components/LotteryContext"
import "./index.css"

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <LotteryContextProvider value={{ jackpot: 0 }}>
            <App />
        </LotteryContextProvider>,
        document.getElementById("root")
    );
})

