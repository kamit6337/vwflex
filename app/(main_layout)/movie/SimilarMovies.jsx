import fetchMovieAdditional from "@api/query/movie/fetchMovieAdditional";
import HorizontalList from "@components/HorizontalList";
import Loading from "@containers/Loading";
import { useQuery } from "@tanstack/react-query";

const MOVIE = "movie";

const SimilarMovies = ({ id }) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["Movie additional", "similar", id],
    queryFn: () => fetchMovieAdditional(id, { similar: true }),
    staleTime: Infinity,
  });

  if (isLoading) {
    return (
      <div className="w-full h-96 ">
        <Loading />
      </div>
    );
  }

  if (error || !data || data?.data.length === 0) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <p>Sorry, we do not have Similar movies data</p>
      </div>
    );
  }

  return (
    <>
      <HorizontalList data={data} type={MOVIE} />
    </>
  );
};

export default SimilarMovies;
