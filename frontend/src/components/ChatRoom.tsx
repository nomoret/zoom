/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDetailRoomState } from "../atoms/detailRoomState";
import { useMessageListState } from "../atoms/messageListState";
import useSocket from "../hooks/useSocket";
import { Message } from "../types/message";

function ChatRoom() {
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(1);
  const [messageList, setMessageList] = useMessageListState();
  const [socket] = useSocket("default");
  const [{ name }] = useDetailRoomState();
  const roomName = name;

  const listElement: any = useRef(null);

  const sendMessage = useCallback(
    (msg: any, name = "me", type = "me") => {
      const updateMessage: Message = {
        name,
        msg,
        type,
      };

      socket?.emit("message", msg, roomName, (res: any) => {
        console.log(res);
        setMessageList((prev) => [...prev, updateMessage]);
      });
    },
    [roomName, setMessageList, socket]
  );

  const recivedMessage = useCallback(
    (msg: any, name = "me", type = "other") => {
      const updateMessage = { name, msg, type };
      socket?.emit("message", msg, roomName, (res: any) => {
        console.log(res);
        setMessageList((prev) => [...prev, updateMessage]);
      });
    },
    [roomName, setMessageList, socket]
  );

  const showJoinUser = useCallback(
    (user: any, userCount: any) => {
      console.log("show join user", user, userCount);
      sendMessage(`${user} joined`);
      setCount(userCount);
    },
    [sendMessage]
  );

  const scrollToBottom = (): void => {
    try {
      listElement?.current?.scrollTo(0, listElement.current.scrollHeight);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("send");
    sendMessage(message);
    scrollToBottom();
    setMessage("");
  };

  useEffect(() => {
    socket?.on("message", recivedMessage);
    socket?.on("welcome", showJoinUser);
    return () => {
      socket?.off("message", recivedMessage);
      socket?.off("welcome", showJoinUser);
    };
  }, [socket]);

  if (!roomName) {
    return (
      <div css={wrapper}>
        <h2>{`Create & Join the Room`}</h2>
      </div>
    );
  }

  return (
    <div css={wrapper}>
      <div css={header}>
        <header>
          <h2>
            <span>{`${roomName}`}</span>
            <span>{`  ${count}`}</span>
          </h2>
          <h3>Description</h3>
        </header>
      </div>
      <div css={content} ref={listElement}>
        <ul>
          <span>Friday, January 11, 2019</span>
          {messageList?.map((message, index) => {
            const { name, msg, type } = message;
            if (type === "other") {
              return (
                <li key={index} css={listAlign["other"]}>
                  <div>
                    <span>{`${name}: `}</span>
                  </div>
                  <div>
                    <span>{`${msg}`}</span>
                  </div>
                </li>
              );
            } else {
              return (
                <li key={index} css={listAlign["me"]}>
                  <div>
                    <span>{`${msg}`}</span>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </div>
      <form css={chatForm} onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Send message"
          onChange={handleOnChange}
          value={message}
          required
        />
        <div>
          <i>➕</i>
        </div>
        <div>
          <span>
            <i>😉</i>
          </span>
          <span>
            <i>🎤</i>
          </span>
        </div>
      </form>
    </div>
  );
}

const wrapper = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 10px 10px;
  width: 300px;
  min-height: 40vh;
`;

const header = css`
  position: relative;
  z-index: 2;
  top: 0px;
  width: 100%;
  padding: 5px 10px;
  background-color: white;
  box-shadow: 0 18px 36px -18px rgba(0, 0, 0, 0.3),
    0 -12px 36px -8px rgba(0, 0, 0, 0.025);
  span {
    flex-grow: 1;
  }
`;

const content = css`
  border-top: 1px solid #f7f7f7;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px;
  max-height: fit-content;
  height: 400px;
  overflow: auto;
  ul {
    border-top: 1px solid #f7f7f7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px 20px;
    padding-top: 30px;
    width: 100%;

    & > span {
      background-color: white;
      font-size: 12px;
      padding: 5px 10px;
      border-radius: 10px;
      margin-bottom: 30px;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 8px 16px -8px,
        rgba(0, 0, 0, 0.024) 0px -6px 16px -6px;
      text-transform: uppercase;
      font-weight: 700;
    }
  }
`;

const chatForm = css`
  position: relative;
  bottom: 0px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  input {
    flex-grow: 1;
  }
`;

const listAlign = {
  me: css`
    align-self: flex-end;
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
  `,
  other: css`
    align-self: flex-start;
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
    div {
      margin-left: 10px;
    }
  `,
};

export default ChatRoom;
