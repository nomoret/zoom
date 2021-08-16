/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import ChatRoom from "../components/ChatRoom";
import ChatSideBar from "../components/ChatSideBar";
import useSocket from "../hooks/useSocket";

const dummy = {
  title: "OK Chat Room",
  messages: [
    { name: "tom", msg: "asdas", type: "other" },
    { name: "me", msg: "asdas", type: "me" },
    { name: "tom", msg: "asdas", type: "other" },
    { name: "me", msg: "asdas", type: "me" },
    { name: "tom", msg: "asdas", type: "other" },
    { name: "me", msg: "asdas", type: "me" },
    { name: "tom", msg: "asdas", type: "other" },
    { name: "me", msg: "asdas", type: "me" },
    { name: "tom", msg: "asdas", type: "other" },
    { name: "me", msg: "asdas", type: "me" },
    { name: "tom", msg: "asdas", type: "other" },
    { name: "me", msg: "asdas", type: "me" },
    { name: "tom", msg: "asdas", type: "other" },
  ],
};
interface Props {}

function Chat({}: Props) {
  const [messages, setMessages] = useState(dummy.messages);
  const [rooms, setRooms] = useState([]);
  const [socket, disconnect] = useSocket("default");

  const showRoomList = (rooms: any) => {
    console.log("rooms", rooms);
    setRooms(rooms);
  };

  const showJoinUser = (user: any, userCount: any) => {
    console.log("show join user", user, userCount);
  };

  useEffect(() => {
    socket?.on("connect", () => {
      console.log("Connected to Server ✅");
    });

    socket?.on("room_change", showRoomList);

    socket?.on("welcome", showJoinUser);

    return () => {
      disconnect();
    };
  }, [socket, disconnect]);

  return (
    <main css={style}>
      <ChatSideBar rooms={rooms} />
      <ChatRoom title={dummy.title} messages={messages} />
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
