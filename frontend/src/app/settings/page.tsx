"use client";
import Link from "next/link";
import { ArrowIcon, withAuthGuard } from "@/components";

function Home() {
  return (
    <div>
      Hello
      <Link href="/">Hello</Link>
      <ArrowIcon />
    </div>
  );
}

export default withAuthGuard(Home);
