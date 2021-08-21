/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import ChatRoom from "../components/ChatRoom";
import ChatSideBar from "../components/ChatSideBar";
import useSocket from "../hooks/useSocket";

function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [roomName, setRoomName] = useState<string>();
  const [rooms, setRooms] = useState([]);
  const [socket, disconnect] = useSocket("default");

  const createRoom = (roomName: string, callBack: any) => {
    socket?.emit("enter_room", roomName, (res: any) => {
      callBack();
      setRoomName(roomName);
      setMessages([]);
    });
  };

  const joinRoom = (roomName: string) => (e: any) => {
    console.log("adsa");
    socket?.emit("enter_room", roomName, () => {
      setRoomName(roomName);
      setMessages([]);
    });
  };

  const sendMessage = useCallback(
    (msg: any, name = "me", type = "me") => {
      const updateMessage = {
        name: socket?.id.slice(0, 4),
        msg,
        type,
      };

      socket?.emit("message", msg, roomName, (res: any) => {
        console.log(res);
        setMessages((prev) => [...prev, updateMessage]);
      });
    },
    [socket, roomName]
  );

  const recivedMessage = useCallback(
    (msg: any, name = "me", type = "other") => {
      const updateMessage = {
        name: socket?.id.slice(0, 4),
        msg,
        type,
      };

      socket?.emit("message", msg, roomName, (res: any) => {
        console.log(res);
        setMessages((prev) => [...prev, updateMessage]);
      });
    },
    [socket, roomName]
  );

  const showRoomList = useCallback((rooms: any) => {
    console.log("rooms", rooms);
    setRooms(rooms);
  }, []);

  const showJoinUser = useCallback((user: any, userCount: any) => {
    console.log("show join user", user, userCount);
    sendMessage(`${user} joined`);
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    socket?.on("connect", () => {
      console.log("Connected to Server ✅");
    });

    socket?.on("message", recivedMessage);

    socket?.on("room_change", showRoomList);

    socket?.on("welcome", showJoinUser);

    return () => {
      disconnect();
    };
  }, [socket, disconnect, showRoomList, showJoinUser]);

  return (
    <main css={style}>
      <ChatSideBar rooms={rooms} createRoom={createRoom} joinRoom={joinRoom} />
      {!roomName ? (
        <div>empty</div>
      ) : (
        <ChatRoom
          title={roomName}
          messages={messages}
          sendMessage={sendMessage}
        />
      )}
    </main>
  );
}

const style = css`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  justify-content: center;
  align-items: flex-start;
  box-shadow: 0 18px 36px -18px rgba(0, 0, 0, 0.3),
    0 -12px 36px -8px rgba(0, 0, 0, 0.025);
`;

export default Chat;
