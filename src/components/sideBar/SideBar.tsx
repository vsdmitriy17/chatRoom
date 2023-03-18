import React, { useContext } from 'react';

import { RoomContext } from '../../context/RoomContext';
import ButtonUtils from '../utils/ButtonUtils';
import styles from './SideBar.module.css';

export const SideBar = () => {
  const { webSocket } = useContext(RoomContext);
  
  const createRoom:()=> void = () => {
    webSocket.emit("create-room");
  };

  return (
      <section className={styles.sideBar}>
        <ButtonUtils text="VIDEO CALL" handleClick={createRoom}/>
      </section>
  )
}