import { useQuery } from "@apollo/client";
import HorizontalList from "@components/HorizontalList";
import { TV } from "@constants/mediaType";
import Loading from "@containers/Loading";
import tvShowRecommendationSchema, {
  getTvShowRecommendationsDataQuery,
} from "@graphql/tv/tvShowRecommendationSchema";

const Recommendations = ({ id, fixed }) => {
  const { loading, data, error } = useQuery(tvShowRecommendationSchema, {
    variables: { id: Number(id), page: 1 },
  });

  if (loading) {
    return (
      <div className="w-full h-96 ">
        <Loading />
      </div>
    );
  }

  if (error || !data || data[getTvShowRecommendationsDataQuery]?.length === 0) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <p>{error.message}</p>
        <p>Sorry, we do not have Recommended TV Shows data</p>
      </div>
    );
  }


const initialData = data[getTvShowRecommendationsDataQuery]


  return (
    <>
      <HorizontalList
        id={id}
        schema={tvShowRecommendationSchema}
        dataQuery={getTvShowRecommendationsDataQuery}
        fixed={fixed}
        initialData={initialData}
        media={TV}
      />
    </>
  );
};

export default Recommendations;
