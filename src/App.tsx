import React, { useEffect } from 'react';

import socketIO from 'socket.io-client';

import styles from './App.module.css';
import { ReactComponent as IconLogo } from './images/logo_icon.svg';

const serverHttp = "http://localhost:5000"; // хост сервера

function App() {
  useEffect(() => {
    socketIO(serverHttp); // Конектимся к нашему серверу
  }, []);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <IconLogo className={styles.logo} />
        <h1 className={styles.title}>
          <span className={styles.title_uni}>UNI</span>
          <span className={styles.title_board}>BOARD</span> 
        </h1>
      </header>
      <main>
        <section className={styles.btnBoard}>
          <button className={styles.button}>Start new meeting</button>
        </section>
      </main>
    </div>
  );
}

export default App;
