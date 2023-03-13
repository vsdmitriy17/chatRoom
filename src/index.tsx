import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { RoomProvider } from './context/RoomContext';
import reportWebVitals from './reportWebVitals';

// import { Home } from "./pages/Home";
// import { Room } from "./pages/Room";
// import { UserProvider } from "./context/UserContext";
// import { ChatProvider } from "./context/ChatContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
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
reportWebVitals();
