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

  // const user = await checkUserLogin();

  // if (!user) {
  //   return (
  //     <div className="h-96 w-full flex justify-center items-center">
  //       <Link href={`/login`}>
  //         <p className="py-4 px-20 border rounded hover:bg-slate-700">
  //           Login to see your watchlist
  //         </p>
  //       </Link>
  //     </div>
  //   );
  // }

  return <Watchlist fixed={fixed} />;
};

export default WatchlistPage;
