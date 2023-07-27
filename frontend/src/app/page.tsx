import Link from "next/link";

function Root() {
  return (
    <main>
      <Link href="/auth/register">Register</Link>
      <Link href="/auth/login">Login</Link>
      <Link href="/settings">Settings</Link>
      <Link href="/home">Home</Link>
      <h1>{`What's App`}</h1>
    </main>
  );
}

export default Root;
