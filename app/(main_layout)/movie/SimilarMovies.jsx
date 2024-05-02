import fetchMovieAdditional from "@api/query/movie/fetchMovieAdditional";
import HorizontalList from "@components/HorizontalList";
import Loading from "@containers/Loading";
import Toastify from "@lib/Toastify";
import { useEffect, useState } from "react";

const MOVIE = "movie";

const SimilarMovies = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const { ToastContainer, showErrorMessage } = Toastify();

  useEffect(() => {
    if (id) {
      const fetchImages = async () => {
        setIsLoading(true);
        try {
          const response = await fetchMovieAdditional(id, { similar: true });
          setData(response);
        } catch (error) {
          showErrorMessage({ message: error.message });
        } finally {
          setIsLoading(false);
        }
      };

      fetchImages();
    }
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
      <HorizontalList data={data} type={MOVIE} />;
      <ToastContainer />
    </>
  );
};

export default SimilarMovies;
