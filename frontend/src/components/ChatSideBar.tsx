/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useState } from "react";

interface Props {}

const dummy = [
  { id: 0, name: "1" },
  { id: 1, name: "2" },
  { id: 2, name: "3" },
  { id: 3, name: "4" },
];

function ChatSideBar({}: Props) {
  const [rooms, setList] = useState(dummy);
  return (
    <div css={style}>
      <h2>My ChatRooms</h2>

      <button>Create new Room</button>

      <ul>
        {rooms?.map(({ id, name }, index) => {
          return (
            <li key={id}>
              <span>{`Name: ${name} ID: ${id}`}</span>
            </li>
          );
        })}
      </ul>
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
