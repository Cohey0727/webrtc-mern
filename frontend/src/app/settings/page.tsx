import Link from "next/link";
import { ArrowIcon } from "@/components";

export default function Home() {
  return (
    <div>
      Hello
      <Link href="/">Hello</Link>
      <ArrowIcon />
    </div>
  );
}
