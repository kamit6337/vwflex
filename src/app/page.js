import Link from "next/link";

export default async function Home() {
  return (
    <section className="flex gap-10">
      <p>hello Home</p>
      <p>
        <Link href={`/movies`}>Movies</Link>
      </p>
    </section>
  );
}
