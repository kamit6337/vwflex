export const metadata = () => {
  return {
    title: "Watchlist",
    description: "This is my watchlist",
  };
};

const WatchlistLayout = ({ movies, tv }) => {
  return (
    <>
      {movies}
      {tv}
     
    </>
  );
};

export default WatchlistLayout;
