import React, {
  useContext,
  useEffect,
} from 'react';

import { useParams } from 'react-router-dom';

import { Chat } from '../../components/chat/Chat';
import { ToolBar } from '../../components/toolBar/ToolBar';
import { Video } from '../../components/video/Video';
import { PeerState } from '../../context/peerReduser';
import { RoomContext } from '../../context/RoomContext';
import styles from './VideoCallRoom.module.css';

export const VideoCallRoom: React.FunctionComponent = () => {
  const { id } = useParams();
  const { webSocket, me, stream, peerState } = useContext(RoomContext);

  useEffect(() => {
    if (me) {
      webSocket.emit("join-room", { roomId: id, peerId: me._id });
    }
  }, [id, me, webSocket])

  return (
    <main className={styles.main}>
      <div className={styles.call}>
        <section className={styles.video}>
          <Video stream={stream}/>
          {Object.values(peerState as PeerState).map((peer) => {
            return (
              <div>
                <h2 className={styles.video_name}>{me.id}</h2>
                <Video key={me.id} stream={peer.stream}/>
              </div>
            );
          })}
        </section>
        <section className={styles.chatBar}>
          <Chat />
        </section>
      </div>
      <ToolBar />
    </main>
  )
}