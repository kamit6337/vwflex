import catchAsyncError from "@lib/catchAsyncError";
import serverAxios from "@utils/server/serverAxios";

const fetchPersonDetails = catchAsyncError(
  async (id, { images = true, credits = true } = {}) => {
    const response = {};

    const person = await serverAxios.get(`/person/${id}`);
    response.details = person;

    if (images) {
      const personImages = await serverAxios.get(`/person/${id}/images`);

      const modifyPersonImages = personImages?.profiles?.map((obj) => {
        const { aspect_ratio: ratio, file_path: path } = obj;
        return { ratio, path };
      });

      response.images = modifyPersonImages;
    }

    if (credits) {
      const personCredits = await serverAxios.get(
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
