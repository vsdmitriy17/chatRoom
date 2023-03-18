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
  const { webSocket, me, stream, peerState, chatShow, setRoomId, screenId } = useContext(RoomContext);

  useEffect(() => {
    if (me) {
      webSocket.emit("join-room", { roomId: id, peerId: me._id });
    }
  }, [id, me, webSocket])

  useEffect(() => {
    setRoomId(id);
  }, [id, setRoomId])

  const screnSharingVidio = screenId === me?.id ? stream : peerState[screenId]?.stream;

  return (
    <main className={styles.main}>
      <div className={styles.call}>
        {screnSharingVidio ? (
          <section className={styles.video_share}>
            <div>
              <h2 className={styles.video_name}>My NickName</h2>
              <Video stream={screnSharingVidio}/>
            </div>
            <div>
              <Video stream={stream}/>
            </div>
          </section>
        ) : (
          <section className={styles.video}>
            <div>
              <h2 className={styles.video_name}>My NickName</h2>
              <Video stream={stream}/>
            </div>
            {Object.values(peerState as PeerState).map((peer) => {
              return (
                <div>
                  <h2 className={styles.video_name}>Friends NickName</h2>
                  <Video stream={peer.stream}/>
                </div>
              );
            })}
          </section>
        )}
        <section className={styles.chatBar}>
          {chatShow && (
            <Chat />
          )}
        </section>
      </div>
      <ToolBar />
    </main>
  )
}