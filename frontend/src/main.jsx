import React from 'react'
import ReactDOM from 'react-dom/client'
import {ToastContainer} from "react-toastify";

import './index.css'
import 'react-toastify/dist/ReactToastify.css';

import App from "./App.jsx";
import {Provider} from "react-redux";
import store from "./app/store.js";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App/>
        <ToastContainer/>
    </Provider>,
)
