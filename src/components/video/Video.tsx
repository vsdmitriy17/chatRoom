import React, {
  useEffect,
  useRef,
} from 'react';

import styles from './Video.module.css';

export const Video: React.FunctionComponent<{stream: MediaStream}> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    };
  }, [stream]);

  return (
    <section className={styles.video}>
      <video ref={videoRef} autoPlay />
    </section>
  )
}