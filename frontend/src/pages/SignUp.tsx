/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import { useCallback, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function SignUp() {
  const [login, setLogin] = useState(false);

  const requestSignUp = useCallback(({ username, password, email }: any) => {
    axios
      .post(
        "http://localhost:8000/api/users",
        {
          name: username,
          password,
          email,
        },
        {}
      )
      .then((res) => res.data)
      .then((data) => setLogin(true))
      .catch(console.error);
  }, []);

  if (login) {
    return <Redirect to="/chat" />;
  }

  return (
    <div css={style}>
      <main>
        <AuthForm callback={requestSignUp} />
        <Link to="/login">
          <button>Log In</button>
        </Link>
      </main>
    </div>
  );
}

const style = css`
  display: flex;
  align-items: center;
  width: 631px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

export default SignUp;
