import fetchTvShowAdditional from "@api/query/tv/fetchTvShowAdditional";
import HorizontalList from "@components/HorizontalList";
import Loading from "@containers/Loading";
import Toastify from "@lib/Toastify";
import { useEffect, useState } from "react";

const TV = "tv";

const Recommendations = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const { ToastContainer, showErrorMessage } = Toastify();

  useEffect(() => {
    if (id) {
      const fetchImages = async () => {
        setIsLoading(true);
        try {
          const response = await fetchTvShowAdditional(id, {
            recommendations: true,
          });
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
        <p>Sorry, we do not have Recommended TV Shows data</p>
      </div>
    );
  }

  return (
    <>
      <HorizontalList data={data} type={TV} />;
      <ToastContainer />
    </>
  );
};

export default Recommendations;
