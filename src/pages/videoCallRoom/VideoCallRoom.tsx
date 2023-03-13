import React, {
  useContext,
  useEffect,
} from 'react';

import { useParams } from 'react-router-dom';

import { Chat } from '../../components/chat/Chat';
import { Video } from '../../components/video/Video';
import { RoomContext } from '../../context/RoomContext';
import styles from './VideoCallRoom.module.css';

export const VideoCallRoom: React.FunctionComponent = () => {
  const { id } = useParams();
  const { webSocket } = useContext(RoomContext);

  useEffect(() => {
    webSocket.emit("join-room", { roomId: id });
  }, [id,webSocket])
  return (
    <main className={styles.main}>
      <Video />
      <Chat />
    </main>
  )
}