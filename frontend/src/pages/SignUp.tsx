/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function SignUp() {
  return (
    <div css={style}>
      <main>
        <AuthForm callback={() => {}} />
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
