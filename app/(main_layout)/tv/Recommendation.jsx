import fetchTvShowAdditional from "@api/query/tv/fetchTvShowAdditional";
import HorizontalList from "@components/HorizontalList";
import Loading from "@containers/Loading";
import { useQuery } from "@tanstack/react-query";

const TV = "tv";

const Recommendations = ({ id }) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["tv additional", "recommendations", id],
    queryFn: () =>
      fetchTvShowAdditional(id, {
        recommendations: true,
      }),
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
        <p>Sorry, we do not have Recommended TV Shows data</p>
      </div>
    );
  }

  return (
    <>
      <HorizontalList data={data} type={TV} />
    </>
  );
};

export default Recommendations;
