import {
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import Peer from 'peerjs';
import { useNavigate } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { v4 as uuidV4 } from 'uuid';

import {
  addPeerAction,
  removePeerAction,
} from './peerActions';
import { peerReduser } from './peerReduser';

const HOST_BACKEND = "http://localhost:5000"; // хост сервера

export const RoomContext = createContext<null | any>(null); // создаем Контекст

const webSocket = socketIOClient(HOST_BACKEND); // Конектимся к нашему серверу

export const RoomProvider: React.FunctionComponent = ({children}) => {
  const navigate = useNavigate();
  const [me, setMe] = useState<Peer>(); //локальный стейт для хранения айди юзера (переделать на айди из БД)
  const [stream, setStream] = useState<MediaStream>(); // локальный стейт для хранения стрима
  const [peerState, dispatch] = useReducer(peerReduser, {});

  const enterRoom = ({roomId}: {roomId: string}) => {
    console.log({roomId});
    navigate(`/room/${roomId}`);
  };

  const getUsers = ({participants}: {participants: string[]}) => {
    console.log({participants});
  }

  const removePeer = (peerId: string) => {
    dispatch(removePeerAction(peerId));
  }

  const shareScreen:()=> void = () => { // выбирает вкладку для шары
    navigator.mediaDevices.getDisplayMedia({}).then(stream => {
      setStream(stream);
    });
  }

  useEffect(() => {
    const meId = uuidV4(); // создаем айди юзера (переделать на айди из БД)
    const peer = new Peer(meId);
    setMe(peer);

    try {
      navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream) => { // обращаемся к медиаУстройствам через встроенные библ браузера
        setStream(stream); //записываем стрим в стейт
      });
    } catch (error) {
      console.error(error);
    }

    webSocket.on("room-created", enterRoom); // слушатель события "room-created" - (отлавливает ответ с бека на событие "room-created")
    webSocket.on("get-users", getUsers);
    webSocket.on("user-disconnected", removePeer);
  }, []);

  useEffect(() => {
    if (!me || !stream) {
      return;
    } else {
      webSocket.on("user-joined", ({peerId}) => { // инициализация звонка
        const call = me.call(peerId, stream);

        call.on("stream", (peerStream) => {
          dispatch(addPeerAction(peerId, peerStream));
        });
      });
    };

    me.on("call", (call) => { // ответ на звонок
      call.answer(stream);

      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream));
      });
    });
  }, [me, stream]);

  console.log("peerState= ", peerState);

  return (
    <RoomContext.Provider value={{webSocket, me, stream, peerState, shareScreen}}>{children}</RoomContext.Provider>
  );
}