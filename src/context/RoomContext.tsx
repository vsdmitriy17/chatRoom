import {
  createContext,
  useEffect,
  useState,
} from 'react';

import Peer from 'peerjs';
import { useNavigate } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { v4 as uuidV4 } from 'uuid';

const HOST_BACKEND = "http://localhost:5000"; // хост сервера

export const RoomContext = createContext<null | any>(null); // создаем Контекст

const webSocket = socketIOClient(HOST_BACKEND); // Конектимся к нашему серверу

export const RoomProvider: React.FunctionComponent = ({children}) => {
  const navigate = useNavigate();
  const [me, setMe] = useState<Peer>(); //локальный стейт для хранения айди юзера (переделать на айди из БД)
  const [stream, setStream] = useState<MediaStream>();

  const enterRoom = ({roomId}: {roomId: string}) => {
    console.log({roomId});
    navigate(`/room/${roomId}`);
  };

  const getUsers = ({participants}: {participants: string[]}) => {
    console.log({participants});
  }

  useEffect(() => {
    const meId = uuidV4(); // создаем айди юзера (переделать на айди из БД)
    const peer = new Peer(meId);
    setMe(peer);

    try {
      navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream) => { // обращаемся к медиаУстройствам через встроенные библ браузера
        setStream(stream);
      });
    } catch (error) {
      console.error(error);
    }

    webSocket.on("room-created", enterRoom); // слушатель события "room-created" - (отлавливает ответ с бека на событие "room-created")
    webSocket.on("get-users", getUsers);
  }, []);

  return (<RoomContext.Provider value={{webSocket, me, stream}}>{children}</RoomContext.Provider>
  );
}