import generateRandomDigitNumber from "@utils/javascript/generateRandomDigitNumber";
import nowPlayingSchema from "../movies/nowPlayingSchema";
import popularMoviesSchema from "../movies/popularMoviesSchema";
import topRatedMoviesSchema from "../movies/topRatedMoviesSchema";
import upcomingMoviesSchema from "../movies/upcomingMoviesSchema";
import airingTodaySchema from "../tvShows/airingTodaySchema";
import onTheAirSchema from "../tvShows/onTheAirSchema";
import populatTvShowSchema from "../tvShows/populatTvShowSchema";
import topRatedTvShowSchema from "../tvShows/topRatedTvShowSchema";
import popularPeoplesSchema, {
  getPopularPeoplesDataQuery,
} from "@graphql/peoples/popularPeoplesSchema";
import { MOVIE, PERSON, TV } from "@constants/mediaType";
import trendingMovieSchema, {
  getTrendingMoviesDataQuery,
} from "@graphql/movies/trendingMovieSchema";

const queryList = [
  // {
  //   id: generateRandomDigitNumber(),
  //   schema: trendingMovieSchema,
  //   dataQuery: getTrendingMoviesDataQuery,
  //   name: "Trending Movies",
  //   media: MOVIE,
  //   instant: true,
  //   pagination: false,
  //   trending: true,
  // },
  {
    id: generateRandomDigitNumber(),
    schema: popularPeoplesSchema,
    dataQuery: getPopularPeoplesDataQuery,
    name: "Popular Peoples",
    media: PERSON,
    instant: true,
    pagination: true,
  },
  {
    id: generateRandomDigitNumber(),
    schema: nowPlayingSchema,
    dataQuery: "getNowPlayingMovies",
    name: "Now Playing",
    media: MOVIE,
    instant: true,
    pagination: true,
  },
  {
    id: generateRandomDigitNumber(),
    schema: popularMoviesSchema,
    dataQuery: "getPopularMovies",
    name: "Popular Movies",
    media: MOVIE,
    instant: true,
    pagination: true,
  },
  {
    id: generateRandomDigitNumber(),
    schema: topRatedMoviesSchema,
    dataQuery: "getTopRatedMovies",
    name: "Top Rated Movies",
    media: MOVIE,
    instant: true,
    pagination: true,
  },
  {
    id: generateRandomDigitNumber(),
    schema: upcomingMoviesSchema,
    dataQuery: "getUpcomingMovies",
    name: "Upcoming Movies",
    media: MOVIE,
    instant: true,
    pagination: true,
  },
  {
    id: generateRandomDigitNumber(),
    schema: airingTodaySchema,
    dataQuery: "getAiringTodayTvShows",
    name: "Airing Today Tv Shows",
    media: TV,
    instant: true,
    pagination: true,
  },
  {
    id: generateRandomDigitNumber(),
    schema: onTheAirSchema,
    dataQuery: "getOnTheAirTvShows",
    name: "On The Air TV Shows",
    media: TV,
    instant: true,
    pagination: true,
  },
  {
    id: generateRandomDigitNumber(),
    schema: populatTvShowSchema,
    dataQuery: "getPopularTvShows",
    name: "Popular TV Shows",
    media: TV,
    instant: true,
    pagination: true,
  },
  {
    id: generateRandomDigitNumber(),
    schema: topRatedTvShowSchema,
    dataQuery: "getTopRatedTvShows",
    name: "Top Rated TV Shows",
    media: TV,
    instant: true,
    pagination: true,
  },
];

export default queryList;
