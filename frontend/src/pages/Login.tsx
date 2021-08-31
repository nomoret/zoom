/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function Login() {
  const [login, setLogin] = useState(false);

  if (login) {
    return <Redirect to="/chat" />;
  }

  return (
    <div css={style}>
      <main>
        <AuthForm isLogIn callback={setLogin} />
        <Link to="/signup">
          <button>sign up</button>
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

export default Login;
