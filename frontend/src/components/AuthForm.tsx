/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useSetUserState } from "../atoms/userState";

interface Props {
  isLogIn?: boolean;
}

function AuthForm({ isLogIn }: Props) {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const setUser = useSetUserState();

  const [error, setError] = useState<string>();

  const validatePassword = useCallback(
    (name: string, value: string, state: any) => {
      if (!name.startsWith("pass")) {
        return;
      }

      const key = name !== "password" ? "password" : "passwordConfirm";
      if (state[key] !== value) {
        setError("missmatch password");
      } else {
        setError("");
      }
    },
    []
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!isLogIn) {
      validatePassword(name, value, state);
    }

    setState({
      ...state,
      [name]: value,
    });
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { email, username: name, password } = state;

    const url = isLogIn
      ? "http://localhost:8000/api/users/logIn"
      : "http://localhost:8000/api/users";

    try {
      const data = await axios
        .post(url, { name, password, email }, {})
        .then((res) => res.data);
      setUser(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <form css={style} onSubmit={onSubmit}>
      {!isLogIn && (
        <>
          <label>Username</label>
          <input type="text" name="username" required onChange={onChange} />
        </>
      )}
      <>
        <label>Email</label>
        <input type="email" name="email" required onChange={onChange} />
      </>
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
      <button>{isLogIn ? "Enter" : "Agree & Join"} </button>
      {error && <span>{error}</span>}
      {isLogIn ? (
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      ) : (
        <Link to="/login">
          <button>Log In</button>
        </Link>
      )}
    </form>
  );
}

const style = css`
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
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
