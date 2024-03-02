"use server";

import catchAsyncError from "@lib/catchAsyncError";
import serverAxios from "@utils/server/serverAxios";

const fetchTvShowAdditional = catchAsyncError(
  async (
    id,
    {
      images = false,
      recommendations = false,
      similar = false,
      reviews = false,
      page = 1,
    }
  ) => {
    if (!id) {
      throw new Error("ID is not provided");
    }

    if (reviews) {
      let tvShowReviews = await serverAxios.get(`/tv/${id}/reviews`, {
        params: { page },
      });

      tvShowReviews = {
        totalPages: tvShowReviews.total_pages,
        page: tvShowReviews.page,
        data: tvShowReviews.results,
      };
      return tvShowReviews;
    }

    if (images) {
      const tvShowImages = await serverAxios.get(`/tv/${id}/images`);

      const imageList = [...tvShowImages?.backdrops]?.map((obj) => {
        const { aspect_ratio: ratio, file_path: path } = obj;

        return { ratio, path };
      });

      return imageList;
    }

    if (recommendations) {
      const recommendationTvShow = await serverAxios.get(
        `/tv/${id}/recommendations`,
        {
          params: { page },
        }
      );

      return {
        page: recommendationTvShow?.page,
        totalPages: recommendationTvShow?.total_pages,
        data: recommendationTvShow?.results,
      };
    }

    if (similar) {
      const similarTvShow = await serverAxios.get(`/tv/${id}/similar`, {
        params: { page },
      });

      return {
        page: similarTvShow?.page,
        totalPages: similarTvShow?.total_pages,
        data: similarTvShow?.results,
      };
    }

    throw new Error("Please check you provided arguments");
  }
);

export default fetchTvShowAdditional;
