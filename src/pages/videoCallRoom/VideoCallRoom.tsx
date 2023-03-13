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
  const { webSocket, me, stream } = useContext(RoomContext);

  useEffect(() => {
    if (me) {
      webSocket.emit("join-room", { roomId: id, peerId: me._id });
    }
  }, [id, me, webSocket])

  return (
    <main className={styles.main}>
      <Video stream={stream}/>
      <Chat />
    </main>
  )
}