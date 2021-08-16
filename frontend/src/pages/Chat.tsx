/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ChatRoom from "../components/ChatRoom";
import ChatSideBar from "../components/ChatSideBar";

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
  return (
    <main css={style}>
      <ChatSideBar />
      <ChatRoom {...dummy} />
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
