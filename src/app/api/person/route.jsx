import Req from "@utils/server/Req";
import Res from "@utils/server/Res";
import fetchReq from "@utils/server/fetchReq";

const TRUE = "true";

export const GET = async (request) => {
  const { query } = Req(request);

  const { id, images, credits } = query;

  if (!id) {
    return Res({ error: "Id is not provided" }, { status: 404 });
  }

  try {
    const response = {};

    const person = await fetchReq(`/person/${id}`);

    response.details = person;

    if (images === TRUE) {
      const personImages = await fetchReq(`/person/${id}/images`);

      const modifyPersonImages = personImages?.profiles?.map((obj) => {
        const { aspect_ratio: ratio, file_path: path } = obj;
        return { ratio, path };
      });

      response.images = modifyPersonImages;
    }

    if (credits === TRUE) {
      const personCredits = await fetchReq(`/person/${id}/combined_credits`);

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

    return Res(response);
  } catch (error) {
    return Res({ error: error.message }, { status: error.status || 500 });
  }
};
