import { useContext } from 'react';

import { Link } from 'react-router-dom';

import { RoomContext } from '../../context/RoomContext';
import ButtonUtils from '../utils/ButtonUtils';
import styles from './ToolBar.module.css';

export const ToolBar = () => {
  const { shareScreen, toggleChat } = useContext(RoomContext);

  return (
    <section className={styles.toolBar}>
      <div className={styles.toolBar_back}>
        <Link to="/">
          BACK
        </Link>
      </div>
      <div className={styles.toolBar_tools}>
        <ButtonUtils text="SCREEN SHARING" handleClick={shareScreen}/>
        <ButtonUtils text="CHAT" handleClick={toggleChat}/>
      </div>
    </section>
  )
}