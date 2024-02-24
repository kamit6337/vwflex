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

const queryList = [
  {
    id: generateRandomId(),
    title: "Now Playing Movies",
    promise: nowPlayingMoviesList,
    type: "movie",
    instant: true,
  },
  {
    id: generateRandomId(),
    title: "Popular Movies",
    promise: popularMoviesList,
    type: "movie",
    instant: true,
  },
  {
    id: generateRandomId(),
    title: "Popular Peoples",
    promise: popularPeoples,
    type: "person",
    instant: true,
  },
  {
    id: generateRandomId(),
    title: "Airing Today Tv Shows",
    promise: airingTodayList,
    type: "tv",
    instant: true,
  },
  {
    id: generateRandomId(),
    title: "On The Air Tv Shows",
    promise: onTheAirList,
    type: "tv",
    instant: true,
  },
  {
    id: generateRandomId(),
    title: "Upcoming Movies",
    promise: upcomingMoviesList,
    type: "movie",
  },
  {
    id: generateRandomId(),
    title: "Top Rated Movies",
    promise: topRatedMoviesList,
    type: "movie",
  },
  {
    id: generateRandomId(),
    title: "Popular TV Shows",
    promise: popularTvShowsList,
    type: "tv",
  },
  {
    id: generateRandomId(),
    title: "Top Rated TV Shows",
    promise: topRatedTvShows,
    type: "tv",
  },
];

export default queryList;
