/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";

interface Props {
  callback: any;
}

function LoginForm({ callback }: Props) {
  const [state, setState] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(e.target);
    if (typeof callback === "function") {
      callback(true);
    }
  };

  return (
    <form css={style} onSubmit={onSubmit}>
      <label>Username</label>
      <input type="text" name="username" required onChange={onChange} />
      <label>Password</label>
      <input type="password" name="password" required onChange={onChange} />
      <button>Enter</button>
    </form>
  );
}

const style = css`
  display: flex;
  flex-direction: column;
  label {
  }
  input {
    width: 272px;
    height: 64px;
    padding-left: 24px;
    padding-right: 24px;
    font-size: 32px;
  }
  button {
    margin-left: 16px;
    font-size: 24px;
    background: none;
    border: none;
    padding-left: 12px;
    padding-right: 12px;
    cursor: pointer;
    width: 272px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #1e88e5;
    &:disabled {
      color: #888888;
    }
    &:hover {
      background: #f5f5f5;
    }
  }
`;
export default LoginForm;
