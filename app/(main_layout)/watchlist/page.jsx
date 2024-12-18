import getFixedData from "@graphql/fixed/query";
import Watchlist from "./Watchlist";
import getAuthToken from "@utils/getAuthToken";
import createClient from "@lib/apolloClient";
import getWatchlistMovieSchema, {
  getWatchlistMoviesDataQuery,
} from "@graphql/watchlist/getWatchlistMovieSchema";
import getWatchlistTvSchema, {
  getWatchlistTvShowsDataQuery,
} from "@graphql/watchlist/getWatchlistTvSchema";
import loginCheckSchema, {
  getLoginCheckDataQuery,
} from "@graphql/auth/loginCheckSchema";

export const metadata = () => {
  return {
    title: "Watchlist",
    description: "This is my watchlist",
  };
};

const WatchlistPage = async () => {
  const { data: fixed } = await getFixedData();

  const token = getAuthToken();

  const client = createClient(token);

  const { data, error } = await client.query({
    query: loginCheckSchema,
    errorPolicy: "all",
  });

  if (error) {
    return <p>Error occur {error.message}</p>;
  }

  if (!data || !data[getLoginCheckDataQuery]) {
    return <p>Please login</p>;
  }

  const { data: movieData, error: movieError } = await client.query({
    query: getWatchlistMovieSchema,
    variables: { page: 1 },
  });

  console.log("movieError", movieError);

  const { data: tvShowData, error: tvError } = await client.query({
    query: getWatchlistTvSchema,
    variables: { page: 1 },
  });

  console.log("tvError", tvError);

  const movieList = movieData?.[getWatchlistMoviesDataQuery];
  const tvShowList = tvShowData?.[getWatchlistTvShowsDataQuery];

  if (!movieList?.length && !tvShowList?.length) {
    return <p>You don`&apos;t have any watchlist movies or tv shows</p>;
  }

  return (
    <Watchlist
      fixed={fixed}
      user={data}
      movies={movieList}
      tvShows={tvShowList}
    />
  );
};

export default WatchlistPage;
