import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { RoomProvider } from './context/RoomContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/vsdmitriy17/chatRoom-front">
      <RoomProvider>
        <App/>
      </RoomProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
