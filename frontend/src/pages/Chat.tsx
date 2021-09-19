/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect } from "react";
import { Redirect } from "react-router";
import { useUserState } from "../atoms/userState";
import ChatRoom from "../components/ChatRoom";
import ChatSideBar from "../components/ChatSideBar";
import useSocket from "../hooks/useSocket";

function Chat() {
  const [socket, disconnect] = useSocket("default");
  const [user] = useUserState();

  useEffect(() => {
    socket?.on("connect", () => {
      console.log("Connected to Server ✅");
    });

    return () => {
      disconnect();
    };
  }, [socket, disconnect]);

  useEffect(() => {
    if (user) {
      socket?.emit("nickname", user.name);
    }
  }, [user?.name]);

  if (!user) {
    return <Redirect to="/login" />;
  }
  return (
    <main css={style}>
      <ChatSideBar />
      <ChatRoom />
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
