import nowPlayingMoviesList from "./movies/nowPlayingMoviesList";
import popularMoviesList from "./movies/popularMoviesList";
import topRatedMoviesList from "./movies/topRatedMoviesList";
import upcomingMoviesList from "./movies/upcomingMoviesList";

const queryList = [
  {
    id: 101,
    title: "Now Playing Movies",
    promise: nowPlayingMoviesList,
    type: "movie",
    instant: true,
  },
  {
    id: 102,
    title: "Popular Movies",
    promise: popularMoviesList,
    type: "movie",
    instant: true,
  },
  {
    id: 103,
    title: "Upcoming Movies",
    promise: upcomingMoviesList,
    type: "movie",
    
  },
  {
    id: 104,
    title: "Top Rated Movies",
    promise: topRatedMoviesList,
    type: "movie",
  },
];

export default queryList;
