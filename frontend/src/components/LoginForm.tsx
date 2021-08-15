interface Props {}

function LoginForm({}: Props) {
  return (
    <div>
      <form action="">
        <label>id</label>
        <input type="text" required />
        <label>password</label>
        <input type="text" required />
        <input type="submit" value="define" />
      </form>
    </div>
  );
}

export default LoginForm;
