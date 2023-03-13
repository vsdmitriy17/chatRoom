import React, { useContext } from 'react';

import { RoomContext } from '../../context/RoomContext';
import styles from './Button.module.css';

interface IProps {
  text: string;
};

const ButtonVideoCall: React.FunctionComponent<IProps> = ({text}) => {
  const { webSocket } = useContext(RoomContext);
  const createRoom = () => {
    webSocket.emit("create-room");
  };
  return (
    <button onClick={createRoom} className={styles.button}>{text}</button>
  )
}

export default ButtonVideoCall;