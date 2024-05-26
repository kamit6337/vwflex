import checkUserLogin from "@api/query/auth/checkUserLogin";
import Link from "next/link";

export const metadata = () => {
  return {
    title: "Watchlist",
    description: "This is my watchlist",
  };
};

export const dynamic = "force-dynamic";

const WatchlistLayout = async ({ children, movies, tv }) => {
  const user = await checkUserLogin();

  if (!user) {
    return (
      <div className="h-96 w-full flex justify-center items-center">
        <Link href={`/login`}>
          <p className="py-4 px-20 border rounded hover:bg-slate-700">
            Login to see your watchlist
          </p>
        </Link>
      </div>
    );
  }

  return (
    <>
      {children}
      {movies}
      {tv}
    </>
  );
};

export default WatchlistLayout;
