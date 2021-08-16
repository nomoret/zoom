/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useState } from "react";
import useSocket from "../hooks/useSocket";
import CreateRoomModal from "./CreateRoomModal";

interface Props {
  rooms: any[];
}

function ChatSideBar({ rooms }: Props) {
  const [show, setShow] = useState(false);

  const [socket] = useSocket("default");

  const onClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setShow(true);
  };

  const onCloseModal = () => {
    setShow(false);
  };

  const createRoom = (roomName: string) => {
    socket?.emit("enter_room", roomName, onCloseModal);
  };

  return (
    <div css={style}>
      <h2>My ChatRooms</h2>

      <button onClick={onClick}>Create new Room</button>

      <ul>
        {rooms?.map((value: any, index: number) => {
          return (
            <li key={index}>
              <span>{`Name: ${value} ID: ${index}`}</span>
            </li>
          );
        })}
      </ul>
      <CreateRoomModal
        show={show}
        onCloseModal={onCloseModal}
        onCreate={createRoom}
      />
    </div>
  );
}

const style = css`
  display: flex;
  flex-direction: column;
  width: 400px;
  h2 {
  }
  button {
    background: none;
    border: none;
    font-weight: 400;
    margin: 10px 0 10px 0;
    cursor: pointer;
    max-width: 600px;
    display: inline-flex;
    text-align: left;
    &:hover {
      background: #f5f5f5;
    }
  }
  ul {
    list-style: none;
    font-size: medium;
    padding: 0;
    margin: 10px;

    li {
      margin-left: 10px;
      cursor: pointer;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
`;

export default ChatSideBar;
