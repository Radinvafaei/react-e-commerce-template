import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './assets/css/styles.css';
import './assets/css/bootstrap.css';
import './assets/css/swiper.css';
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
