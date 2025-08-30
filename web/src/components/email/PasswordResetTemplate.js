export default function PasswordResetTemplate({ firstName, securityCode }) {
  return (
    <div>
      <h1>Hello {firstName}</h1>
      <p>
        Use this code to reset your password.
        <br />
        Do not share the code with anybody.
        <br />
        <b>Code: {securityCode}</b>
        <br />
        <b>This code expires in 10 minutes.</b>
      </p>
    </div>
  );
}
