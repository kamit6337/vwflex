import fetchTvShowAdditional from "@api/query/tv/fetchTvShowAdditional";
import HorizontalList from "@components/HorizontalList";
import Loading from "@containers/Loading";
import { useQuery } from "@tanstack/react-query";

const TV = "tv";

const Similar = ({ id }) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["tv additional", "similar", id],
    queryFn: () =>
      fetchTvShowAdditional(id, {
        similar: true,
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
        <p>Sorry, we do not have Similar TV Shows data</p>
      </div>
    );
  }

  return (
    <>
      <HorizontalList data={data} type={TV} />
    </>
  );
};

export default Similar;
