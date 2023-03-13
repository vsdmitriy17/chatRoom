import {
  createContext,
  useEffect,
} from 'react';

import { useNavigate } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

const HOST_BACKEND = "http://localhost:5000"; // хост сервера

export const RoomContext = createContext<null | any>(null); // создаем Контекст

const webSocket = socketIOClient(HOST_BACKEND); // Конектимся к нашему серверу

export const RoomProvider: React.FunctionComponent = ({children}) => {
  const navigate = useNavigate();

  const enterRoom = ({roomId}: {roomId: string}) => {
    console.log({roomId});
    navigate(`/room/${roomId}`);
  };

  useEffect(() => {
    webSocket.on("room-created", enterRoom); // слушатель события "room-created" - (отлавливает ответ с бека на событие "room-created")
  }, []);

  return (<RoomContext.Provider value={{webSocket}}>{children}</RoomContext.Provider>
  );
}