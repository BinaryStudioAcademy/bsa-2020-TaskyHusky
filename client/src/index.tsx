import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App/App';
import * as serviceWorker from './serviceWorker';
import configureLanguages from './config/i18n.config';
import 'semantic-ui-css/semantic.min.css';
import 'react-notifications/lib/notifications.css';
import 'styles/index.scss';

configureLanguages();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
