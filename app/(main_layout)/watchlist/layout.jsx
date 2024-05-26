export const metadata = () => {
  return {
    title: "Watchlist",
    description: "This is my watchlist",
  };
};

export const dynamic = "force-dynamic";

const WatchlistLayout = ({ children, movies, tv }) => {
  return (
    <>
      {children}
      {movies}
      {tv}
    </>
  );
};

export default WatchlistLayout;
