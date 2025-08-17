export default function AccountRecoveryTemplate({
  firstName,
  username,
  email,
}) {
  return (
    <div>
      <h1>Hello {firstName}</h1>
      <p>
        Crudly-API Accovount Recovery Information: <br />
        Username: {username} <br />
        Email: {email} <br />
        Thanks!
      </p>
    </div>
  );
}
