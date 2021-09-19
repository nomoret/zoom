/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useCallback, useEffect, useState } from "react";
import { useSetDetailRoomState } from "../atoms/detailRoomState";
import { useSetMessageListState } from "../atoms/messageListState";
import { useRoomState } from "../atoms/roomState";
import useSocket from "../hooks/useSocket";
import { DetailRoom } from "../types/detailRoom";
import CreateRoomModal from "./CreateRoomModal";

function ChatSideBar() {
  const [show, setShow] = useState(false);
  const [socket] = useSocket("default");
  const setRoom = useSetDetailRoomState();
  const [rooms, setRooms] = useRoomState();
  const setMessages = useSetMessageListState();

  const createRoom = (roomName: string, callBack: any) => {
    socket?.emit("enter_room", roomName, (res: any) => {
      callBack();
      setRoom({
        name: roomName,
      });
      setMessages([]);
    });
  };

  const joinRoom = (roomName: string) => (e: any) => {
    socket?.emit("enter_room", roomName, () => {
      const newRoom: DetailRoom = {
        name: roomName,
      };
      setRoom(newRoom);
      setMessages([]);
    });
  };
  const showRoomList = useCallback((rooms: any) => {
    console.log("rooms", rooms);
    setRooms(rooms);
  }, []);

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

  useEffect(() => {
    socket?.on("room_change", showRoomList);
    return () => {
      socket?.off("room_change", showRoomList);
    };
  }, [socket, showRoomList]);

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
