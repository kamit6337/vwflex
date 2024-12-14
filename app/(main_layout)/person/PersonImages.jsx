import { useQuery } from "@apollo/client";
import ImageCollections from "@components/ImageCollections";
import { PERSON } from "@constants/mediaType";
import Loading from "@containers/Loading";
import personImageSchema, {
  getPersonImagesDataQuery,
} from "@graphql/peoples/personImageSchema";

const PersonImages = ({ id, fixed }) => {
  const { loading, data, error } = useQuery(personImageSchema, {
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

  if (error || !data || data[getPersonImagesDataQuery]?.length === 0) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <p>Sorry, we do not have images</p>
      </div>
    );
  }

  const imageList = data[getPersonImagesDataQuery];

  return <ImageCollections fixed={fixed} list={imageList} mediaType={PERSON} />;
};

export default PersonImages;
