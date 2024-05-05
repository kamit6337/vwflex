import fetchTvShowAdditional from "@api/query/tv/fetchTvShowAdditional";
import HorizontalList from "@components/HorizontalList";
import Loading from "@containers/Loading";

const TV = "tv";

const Recommendations = ({ id }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["Recommended TV Shows", id],
    queryFn: () =>
      fetchTvShowAdditional(id, {
        recommendations: true,
      }),
    staleTime: Infinity,
    enabled: !!id,
  });

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
      <HorizontalList data={data} type={TV} />
    </>
  );
};

export default Recommendations;
