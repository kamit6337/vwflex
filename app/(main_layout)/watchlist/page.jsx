import getFixedData from "@graphql/fixed/query";
import Watchlist from "./Watchlist";
import getAuthToken from "@utils/getAuthToken";

export const metadata = () => {
  return {
    title: "Watchlist",
    description: "This is my watchlist",
  };
};

const WatchlistPage = async () => {
  const { data: fixed } = await getFixedData(getAuthToken());

  return <Watchlist fixed={fixed} />;
};

export default WatchlistPage;
