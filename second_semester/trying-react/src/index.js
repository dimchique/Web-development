import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
document.body.innerHTML = '<div id="root"></div>';

const root = ReactDOM.createRoot(document.getElementById('root'));
const element = <h2> Hello, world! </h2>;
root.render(element)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();