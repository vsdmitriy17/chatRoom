import { Chat } from '../../components/chat/Chat';
import { SideBar } from '../../components/sideBar/SideBar';
import styles from './ChatRoom.module.css';

export const ChatRoom = () => {
  return (
    <main className={styles.main}>
      <SideBar />
      <Chat />
    </main>
  )
}