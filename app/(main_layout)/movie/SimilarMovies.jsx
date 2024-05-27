import fetchMovieAdditional from "@api/query/movie/fetchMovieAdditional";
import HorizontalList from "@components/HorizontalList";
import Loading from "@containers/Loading";
import { useEffect, useState } from "react";

const MOVIE = "movie";

const SimilarMovies = ({ id }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetchMovieAdditional(id, { similar: true });
        setData(response);
      } catch (error) {
        setData(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-full h-96 ">
        <Loading />
      </div>
    );
  }

  if (!data || data?.data.length === 0) {
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
