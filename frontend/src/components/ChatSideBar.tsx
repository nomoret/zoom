/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useState } from "react";
import CreateRoomModal from "./CreateRoomModal";

interface Props {
  rooms: any[];
  createRoom: any;
  joinRoom: any;
}

function ChatSideBar({ rooms, createRoom, joinRoom }: Props) {
  const [show, setShow] = useState(false);

  const onClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShow(true);
  };

  const onCreate = (roomName: string) => {
    createRoom(roomName, onCloseModal);
  };

  const onCloseModal = () => {
    console.log("close modal");
    setShow(false);
  };

  return (
    <div css={style}>
      <h2>My ChatRooms</h2>

      <button onClick={onClick}>Create new Room</button>

      <ul>
        {rooms?.map((value: any, index: number) => {
          return (
            <li key={index} onClick={joinRoom(value)}>
              <span>{`Name: ${value} ID: ${index}`}</span>
            </li>
          );
        })}
      </ul>
      <CreateRoomModal
        show={show}
        onCloseModal={onCloseModal}
        onCreate={onCreate}
      />
    </div>
  );
}

const style = css`
  flex: 1;
  flex-direction: column;
  width: 400px;
  margin-left: 2rem;
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
