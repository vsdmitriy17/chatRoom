import React, { useEffect } from 'react';

import socketIO from 'socket.io-client';

import styles from './App.module.css';

const serverHttp = "http://localhost:5000"; // хост сервера

function App() {
    useEffect(() => {
        socketIO(serverHttp); // Конектимся к нашему серверу
    }, []);
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>CONNECTION SUCCESS!!!</h1>
        </div>
    );
}

export default App;
