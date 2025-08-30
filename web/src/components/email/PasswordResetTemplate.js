export default function PasswordResetTemplate({ firstName, securityCode }) {
  return (
    <div>
      <h1>Hello {firstName}</h1>
      <p>
        Use this code to reset your password. Do not sure the code with anybody.
        Code: {securityCode}
        <b>This code expires in 10 minutes.</b>
      </p>
    </div>
  );
}
