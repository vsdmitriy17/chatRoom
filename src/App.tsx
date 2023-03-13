import {
  Route,
  Routes,
} from 'react-router-dom';

import styles from './App.module.css';
import { Header } from './components/header/Header';
import { ChatRoom } from './pages/chatRoom/ChatRoom';
import { VideoCallRoom } from './pages/videoCallRoom/VideoCallRoom';

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Routes>
        <Route path="/" element={<ChatRoom />} />
        <Route path="/room/:id" element={<VideoCallRoom />} />
      </Routes>
    </div>
  );
}

export default App;
