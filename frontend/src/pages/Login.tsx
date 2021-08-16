/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "../components/LoginForm";

function Login() {
  const [login, setLogin] = useState(false);

  if (login) {
    return <Redirect to="/chat" />;
  }

  return (
    <div css={style}>
      <main>
        <LoginForm callback={setLogin} />
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
