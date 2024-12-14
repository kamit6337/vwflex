import { gql } from "@apollo/client";

const topRatedTvShowSchema = gql`
  query GET_TOP_RATED_TVSHOWS($page: Int!) {
    getTopRatedTvShows(page: $page) {
      backdrop_path
      id
      name
      first_air_date
      overview
      vote_average
    }
  }
`;

export default topRatedTvShowSchema;
