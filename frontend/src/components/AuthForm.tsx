/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useCallback, useState } from "react";

interface Props {
  isLogIn?: boolean;
  callback: any;
}

function AuthForm({ isLogIn, callback }: Props) {
  const [state, setState] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState<string>();

  const validatePassword = useCallback(
    (name: string, value: string, state: any) => {
      if (name === "password") {
        if (state.passwordConfirm !== value) {
          setError("missmatch password");
        } else {
          setError("");
        }
      } else if (name === "passwordConfirm") {
        if (state.password !== value) {
          setError("missmatch password");
        } else {
          setError("");
        }
      }
    },
    []
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validatePassword(name, value, state);
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
      {!isLogIn && (
        <>
          <label>Password Check</label>
          <input
            type="password"
            name="passwordConfirm"
            required
            onChange={onChange}
          />
        </>
      )}
      <button>{isLogIn ? "Enter" : "Sign Up"} </button>
      {error && <span>{error}</span>}
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
export default AuthForm;
