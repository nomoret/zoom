/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useSetMessageListState } from "../atoms/messageListState";
import { useUserState } from "../atoms/userState";
import ChatRoom from "../components/ChatRoom";
import ChatSideBar from "../components/ChatSideBar";
import useSocket from "../hooks/useSocket";
import { Message } from "../types/message";

function Chat() {
  const setMessages = useSetMessageListState();
  const [roomName, setRoomName] = useState<string>();
  const [rooms, setRooms] = useState([]);
  const [socket, disconnect] = useSocket("default");

  const [user] = useUserState();

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
      console.log(socket);
      const updateMessage: Message = {
        name,
        msg,
        type,
      };

      socket?.emit("message", msg, roomName, (res: any) => {
        console.log(res);
        setMessages((prev) => [...prev, updateMessage]);
      });
    },
    [socket, roomName, setMessages]
  );

  const recivedMessage = useCallback(
    (msg: any, name = "me", type = "other") => {
      console.log("받자", name);
      const updateMessage = {
        name,
        msg,
        type,
      };

      socket?.emit("message", msg, roomName, (res: any) => {
        console.log(res);
        setMessages((prev) => [...prev, updateMessage]);
      });
    },
    [socket, roomName, setMessages]
  );

  const showRoomList = useCallback((rooms: any) => {
    console.log("rooms", rooms);
    setRooms(rooms);
  }, []);

  const showJoinUser = useCallback((user: any, userCount: any) => {
    console.log("show join user", user, userCount);
    sendMessage(`${user} joined`);
  }, []);

  useEffect(() => {
    if (user) {
      socket?.emit("nickname", user.name);
    }
  }, [user?.name]);

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
  }, [socket, disconnect]);

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <main css={style}>
      <ChatSideBar rooms={rooms} createRoom={createRoom} joinRoom={joinRoom} />
      <ChatRoom title={roomName} sendMessage={sendMessage} />
    </main>
  );
}

const style = css`
  display: flex;
  width: 80%;
  height: 70%;
  margin: 0 auto;
  box-shadow: 0 18px 36px -18px rgba(0, 0, 0, 0.3),
    0 -12px 36px -8px rgba(0, 0, 0, 0.025);
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

export default Chat;
