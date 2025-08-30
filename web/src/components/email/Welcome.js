export default function WelcomeTemplate({ firstName, comment }) {
  return (
    <div>
      <h1>Welcome, {firstName}</h1>
      <p>This is a test!</p>
      <p>{comment}</p>
    </div>
  );
}
