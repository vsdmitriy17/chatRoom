import React, {
  useEffect,
  useRef,
} from 'react';

import styles from './Video.module.css';

export const Video: React.FunctionComponent<{stream: MediaStream}> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null); // забираем элемент видео из htmlDocument

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream; // передаем элементу видео стрим и потом пропсом прокидываем его в компонент видео
    };
  }, [stream]);

  return (
    <section className={styles.video}>
      <video ref={videoRef} autoPlay muted={true}/>
    </section>
  )
}