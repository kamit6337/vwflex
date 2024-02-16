import fetchTvShowDetails from "@api/query/tv/fetchTvShowDetails";
import TvId from "./TvId";

const TvIdPage = async ({ params: { id } }) => {
  const query = await fetchTvShowDetails(id);

  if (!query) return null;

  return <TvId query={query} />;
};

export default TvIdPage;
