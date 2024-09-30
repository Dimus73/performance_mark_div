import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HashRouter} from "react-router-dom";
import PerformanceMetrics from "./Performance/PerformanceMitrics/PerformanceMitrics";

ReactDOM.render(
    <HashRouter>
        <PerformanceMetrics />
        <App />
    </HashRouter>,
    document.getElementById('root')
);
