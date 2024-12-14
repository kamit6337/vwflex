import { useQuery } from "@apollo/client";
import ImageCollections from "@components/ImageCollections";
import Loading from "@containers/Loading";
import movieImagesSchema, {
  getMovieImagesDataQuery,
} from "@graphql/movie/movieImagesSchema";

const MovieImages = ({ id, fixed }) => {
  const { loading, data, error } = useQuery(movieImagesSchema, {
    variables: {
      id: Number(id),
    },
  });

  if (loading) {
    return (
      <div className="w-full h-96 ">
        <Loading />
      </div>
    );
  }

  if (error || !data || data[getMovieImagesDataQuery]?.length === 0) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <p>Sorry, we do not have images</p>
      </div>
    );
  }

  const imageList = data[getMovieImagesDataQuery];

  return <ImageCollections fixed={fixed} list={imageList} />;
};

export default MovieImages;
