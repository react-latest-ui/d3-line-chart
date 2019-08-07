import React from "react";
import ReactDOM from "react-dom";
import LineChartComponent from './components/line-chart';
import logo from './logo.svg';
import './app.scss';
function App() {
    return (
        <div className="app">
            <header className="app-header">
                <img src={logo} className="app-logo" alt="logo" />
            </header>
            <div className="app-body">
                <LineChartComponent />
            </div>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
