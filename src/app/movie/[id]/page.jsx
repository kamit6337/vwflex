import fetchMovieDetail from "@api/query/movie/fetchMovieDetail";

const MovieDetailPage = async ({ params: { id } }) => {
  const query = await fetchMovieDetail(Number(id));

  return (
    <div>
      <p>{query?.details.title}</p>
      <p>{JSON.stringify(query)}</p>
    </div>
  );
};

export default MovieDetailPage;
