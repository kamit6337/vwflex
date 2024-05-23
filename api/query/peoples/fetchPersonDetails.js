import catchAsyncError from "@lib/catchAsyncError";
import { getReq } from "@utils/api/serverApi";

const fetchPersonDetails = catchAsyncError(
  async (id, { images = true, credits = true } = {}) => {
    const response = {};

    const person = await getReq(`/person/${id}`);
    response.details = person;

    if (images) {
      const personImages = await getReq(`/person/${id}/images`);

      const modifyPersonImages = personImages?.profiles?.map((obj) => {
        const { aspect_ratio: ratio, file_path: path } = obj;
        return { ratio, path };
      });

      response.images = modifyPersonImages;
    }

    if (credits) {
      const personCredits = await getReq(
        `/person/${id}/combined_credits`
      );

      const personTvCredits = personCredits?.cast?.filter((obj) => {
        return obj.media_type === "tv";
      });

      const personMovieCredits = personCredits?.cast?.filter((obj) => {
        return obj.media_type === "movie";
      });

      response.credits = {
        tv: personTvCredits,
        movies: personMovieCredits,
      };
    }

    return response;
  }
);

export default fetchPersonDetails;
