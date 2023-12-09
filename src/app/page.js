import UseInitialFetch from "@hooks/useInitialFetch";
import Link from "next/link";

export default async function Home() {
  await UseInitialFetch();

  return (
    <section className="flex gap-10">
      <p>hello Home</p>
      <p>
        <Link href={`/movies`}>Movies</Link>
      </p>
    </section>
  );
}
