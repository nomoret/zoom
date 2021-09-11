/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { useUserState } from "../atoms";
import AuthForm from "../components/AuthForm";

function Login() {
  const [user, setUser] = useUserState();

  const requestLogIn = ({ username, email, password }: any) => {
    axios
      .post(
        "http://localhost:8000/api/users/logIn",
        {
          name: username,
          password,
          email,
        },
        {}
      )
      .then((res) => res.data)
      .then((data) => {
        setUser(data);
      })
      .catch(console.error);
  };

  if (user) {
    return <Redirect to="/chat" />;
  }

  return (
    <div css={style}>
      <main>
        <AuthForm isLogIn callback={requestLogIn} />
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
