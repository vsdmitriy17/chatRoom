import {
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import Peer, { MediaConnection } from 'peerjs';
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
  const [screenId, setScreenId] = useState<string>("");
  const [chatShow, setChatShow] = useState<boolean>(false);
  const [peerState, dispatch] = useReducer(peerReduser, {});
  const [roomId, setRoomId] = useState<string>("");

  const enterRoom = ({roomId}: {roomId: string}) => {
    // console.log({roomId});
    navigate(`/room/${roomId}`);
  };

  const getUsers = ({participants}: {participants: string[]}) => {
    console.log({participants});
  }

  const removePeer = (peerId: string) => {
    dispatch(removePeerAction(peerId));
  }

  const switchStream = (stream: MediaStream) => {
    setStream(stream);
    if (!screenId) {
      setScreenId(me?.id || "");
      // console.log("me=", me);
      // console.log("peersState=", peerState);
      // console.log("peersKeys=", Object.keys(peerState));
    } else {
      setScreenId("");
    }

    const connections = me?.connections as Map<string, MediaConnection[]>; // меняем тип устаревшего свойства
    Object.values(connections).forEach((connection:any) => { // заменяем видеотрек у др юзеров на новый (для нашего окна)
      const videoTrack = stream?.getTracks().find(track => track.kind === 'video');
      connection[0].peerConnection.getSenders()[1].replaceTrack(videoTrack).catch((err: any) => console.error(err));
    })
  }

  const shareScreen:()=> void = () => { // выбирает вкладку для шары
    if (screenId) {
      navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(switchStream);
    } else {
      navigator.mediaDevices.getDisplayMedia({}).then(switchStream); // выбирает вкладку для шары
    }
  }

  const toggleChat:()=> void = () => {
    if (chatShow) {
      setChatShow(false);
    } else {
      setChatShow(true);
    }
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
    webSocket.on("user-started-sharing", (peerId: string) => {
      setScreenId(peerId);
    });
    webSocket.on("user-stop-sharing", () => {
      setScreenId("");
    });

    return () => {
      webSocket.off("room-created"); // снимаем слушателя события "room-created"
      webSocket.off("get-users");
      webSocket.off("user-disconnected");
      webSocket.off("user-started-sharing");
      webSocket.off("user-stop-sharing");
    }
  }, []);

  useEffect(() => {
    if (screenId) {
      webSocket.emit("start-sharing", {peerId: screenId, roomId});
    } else {
      webSocket.emit("stop-sharing", {roomId});
    }

  }, [screenId, roomId])

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

  return (
    <RoomContext.Provider value={{webSocket, me, stream, peerState, shareScreen, screenId, chatShow, toggleChat, setRoomId}}>{children}</RoomContext.Provider>
  );
}