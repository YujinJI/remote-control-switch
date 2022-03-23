import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './app';
import {AuthService, DeviceService} from "./service/firebase_service";

const authService = AuthService;
const deviceService = DeviceService;

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} deviceService={deviceService}/>
  </React.StrictMode>,
  document.getElementById('root')
);
