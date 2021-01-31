import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import styles from './styles.module.less';

ReactDOM.render(
    <React.StrictMode>
        <h1 className={styles.title}>dayday up</h1>
        <App />
    </React.StrictMode>,

    document.getElementById('root'),
);

reportWebVitals();
