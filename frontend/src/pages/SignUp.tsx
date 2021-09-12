/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import { useCallback } from "react";
import { Link, Redirect } from "react-router-dom";
import { useUserState } from "../atoms";
import AuthForm from "../components/AuthForm";

function SignUp() {
  const [user, setUser] = useUserState();

  const requestSignUp = useCallback(
    ({ username, password, email }: any) => {
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
        .then((data) => setUser(data))
        .catch(console.error);
    },
    [setUser]
  );

  if (user) {
    return <Redirect to="/login" />;
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
