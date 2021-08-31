import React, { useState } from "react";
import Modal from "./Modal";

interface Props {
  show: boolean;
  onCloseModal: any;
  onCreate: any;
}

function CreateRoomModal({ show, onCloseModal, onCreate }: Props) {
  const [roomName, setRoomName] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(roomName);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };
  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onSubmit}>
        <input type="text" name="roomName" onChange={onChange} autoFocus />
        <button>enter</button>
      </form>
    </Modal>
  );
}

export default CreateRoomModal;
