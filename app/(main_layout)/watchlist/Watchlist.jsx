"use client";
import { useApolloClient } from "@apollo/client";
import loginCheckSchema from "@graphql/auth/loginCheckSchema";
import { useEffect } from "react";
import HorizontalList from "@components/HorizontalList";
import { MOVIE, TV } from "@constants/mediaType";
import getWatchlistMovieSchema, {
  getWatchlistMoviesDataQuery,
} from "@graphql/watchlist/getWatchlistMovieSchema";
import getWatchlistTvSchema, {
  getWatchlistTvShowsDataQuery,
} from "@graphql/watchlist/getWatchlistTvSchema";

const Watchlist = ({ fixed, user, movies, tvShows }) => {
  const client = useApolloClient();

  useEffect(() => {
    if (user) {
      client.cache.writeQuery({
        query: loginCheckSchema,
        data: user,
      });
    }
  }, [user, client]);

  // const {
  //   loading: loginCheckLoading,
  //   error: loginCheckError,
  //   data: userData,
  // } = useQuery(loginCheckSchema);

  // if (loginCheckLoading) {
  //   return <Loading hScreen={true} />;
  // }

  // if (loginCheckError) {
  //   console.error("Error in profile", loginCheckError?.message);
  //   return;
  // }

  // if (!userData) {
  //   return <p>Please login to see watchlist</p>;
  // }

  return (
    <>
      {movies?.length > 0 && (
        <HorizontalList
          id={"1245678900-"}
          schema={getWatchlistMovieSchema}
          dataQuery={getWatchlistMoviesDataQuery}
          name={"Watchlist Movies"}
          initialData={movies}
          media={MOVIE}
          zIndex={20}
          fixed={fixed}
          pagination={true}
          variables={{ page: 1 }}
        />
      )}
      {tvShows?.length > 0 && (
        <HorizontalList
          id={"watchlsitvtvId"}
          watchlistTv={true}
          schema={getWatchlistTvSchema}
          dataQuery={getWatchlistTvShowsDataQuery}
          name={"Watchlist TV Shows"}
          initialData={tvShows}
          media={TV}
          zIndex={19}
          fixed={fixed}
          pagination={true}
          variables={{ page: 1 }}
        />
      )}
    </>
  );
};

export default Watchlist;
