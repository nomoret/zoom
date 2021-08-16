/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface Props {
  title?: string;
  messages?: any[];
}

function ChatRoom({ title, messages = [] }: Props) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: 10px 10px;
        width: 300px;
        min-height: 40vh;
      `}
    >
      <div
        css={css`
          position: relative;
          z-index: 2;
          top: 0px;
          width: 100%;
          padding: 5px 0px;
          background-color: white;
          box-shadow: 0 18px 36px -18px rgba(0, 0, 0, 0.3),
            0 -12px 36px -8px rgba(0, 0, 0, 0.025);
        `}
      >
        <header>
          <h2>{`${title}`}</h2>
          <h3>Description</h3>
        </header>
      </div>
      <div
        css={css`
          border-top: 1px solid #f7f7f7;
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          align-items: center;
          padding: 0px 20px;
          max-height: fit-content;
          height: 400px;
          overflow: auto;
        `}
      >
        <ul
          css={css`
            border-top: 1px solid #f7f7f7;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 0px 20px;
            padding-top: 30px;
            width: 100%;
          `}
        >
          <span
            css={css`
              background-color: white;
              font-size: 12px;
              padding: 5px 10px;
              border-radius: 10px;
              margin-bottom: 30px;
              box-shadow: rgba(0, 0, 0, 0.3) 0px 8px 16px -8px,
                rgba(0, 0, 0, 0.024) 0px -6px 16px -6px;
              text-transform: uppercase;
              font-weight: 700;
            `}
          >
            Friday, January 11, 2019
          </span>
          {messages?.map((message, index) => {
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
      <form
        css={css`
          position: relative;
          bottom: 0px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        `}
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target);
        }}
      >
        <input
          type="text"
          placeholder="Send message"
          onChange={(e) => {
            console.log(e.target.value);
          }}
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
  `,
};

export default ChatRoom;
