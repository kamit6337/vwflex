import fetchTvShowAdditional from "@api/query/tv/fetchTvShowAdditional";
import HorizontalList from "@components/HorizontalList";
import Loading from "@containers/Loading";
import { useEffect, useState } from "react";

const TV = "tv";

const Similar = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchImages = async () => {
        setIsLoading(true);
        try {
          const response = await fetchTvShowAdditional(id, { similar: true });
          setData(response);
        } catch (error) {
          console.log("error in movies images", error);
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

  if (!data) {
    return <p>Sorry, we do not have Similar TV Shows data</p>;
  }

  return <HorizontalList data={data} type={TV} />;
};

export default Similar;
