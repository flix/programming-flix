import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ReactGA from 'react-ga';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter} from "react-router-dom";

ReactGA.initialize('UA-136308253-1', {debug: false});

ReactDOM.render(
    <HashRouter>
        <App/>
    </HashRouter>,
    document.getElementById('root')
);

registerServiceWorker();
