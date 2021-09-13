/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Redirect } from "react-router-dom";
import { useUserState } from "../atoms/userState";
import AuthForm from "../components/AuthForm";

function Login() {
  const [user] = useUserState();

  if (user) {
    return <Redirect to="/chat" />;
  }

  return (
    <div css={style}>
      <main>
        <AuthForm isLogIn />
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
