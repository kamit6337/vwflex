import GetReq from "@utils/client/GetReq";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  return (
    <section className="flex gap-10">
      <p>hello world</p>
      <p>
        <Link href={`/movies`}>Movies</Link>
      </p>
    </section>
  );
}
