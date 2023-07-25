import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/auth/register">Register</Link>
      <Link href="/auth/login">Login</Link>
      <h1>{`What's App`}</h1>
    </main>
  );
}
