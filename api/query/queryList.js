import generateRandomId from "@utils/javascript/generateRandomId";
import nowPlayingMoviesList from "./movies/nowPlayingMoviesList";
import popularMoviesList from "./movies/popularMoviesList";
import topRatedMoviesList from "./movies/topRatedMoviesList";
import upcomingMoviesList from "./movies/upcomingMoviesList";
import airingTodayList from "./tvShows/airingTodayList";
import onTheAirList from "./tvShows/onTheAirList";
import popularTvShowsList from "./tvShows/popularTvShowsList";
import topRatedTvShows from "./tvShows/topRatedTvShows";
import popularPeoples from "./peoples/popularPeoples";
import trendingMovies from "./trending/trendingMovies";
import trendingTvShows from "./trending/trendingTvShows";
import trendingPeoples from "./trending/trendingPeoples";

const MOVIE = "movie";
const TV = "tv";
const PERSON = "person";

const queryList = [
  {
    id: generateRandomId(),
    title: "Trending Movies",
    promise: trendingMovies,
    type: MOVIE,
    trending: true,
    instant: true,
  },
  {
    id: generateRandomId(),
    title: "Trending TV Shows",
    promise: trendingTvShows,
    type: TV,
    trending: true,
    instant: true,
  },

  {
    id: generateRandomId(),
    title: "Trending Peoples",
    promise: trendingPeoples,
    type: PERSON,
    trending: true,
    instant: true,
  },
  {
    id: generateRandomId(),
    title: "Now Playing Movies",
    promise: nowPlayingMoviesList,
    type: MOVIE,
    trending: false,
    instant: true,
  },
  {
    id: generateRandomId(),
    title: "Popular Movies",
    promise: popularMoviesList,
    trending: false,
    type: MOVIE,
    instant: true,
  },
  {
    id: generateRandomId(),
    title: "Popular Peoples",
    promise: popularPeoples,
    trending: false,
    type: PERSON,
    instant: true,
  },
  {
    id: generateRandomId(),
    title: "Airing Today Tv Shows",
    promise: airingTodayList,
    trending: false,
    type: TV,
    instant: true,
  },
  {
    id: generateRandomId(),
    title: "On The Air Tv Shows",
    promise: onTheAirList,
    trending: false,
    type: TV,
    instant: true,
  },
  {
    id: generateRandomId(),
    title: "Upcoming Movies",
    promise: upcomingMoviesList,
    trending: false,
    type: MOVIE,
  },
  {
    id: generateRandomId(),
    title: "Top Rated Movies",
    promise: topRatedMoviesList,
    trending: false,
    type: MOVIE,
  },
  {
    id: generateRandomId(),
    title: "Popular TV Shows",
    promise: popularTvShowsList,
    trending: false,
    type: TV,
  },
  {
    id: generateRandomId(),
    title: "Top Rated TV Shows",
    promise: topRatedTvShows,
    trending: false,
    type: TV,
  },
];

export default queryList;
