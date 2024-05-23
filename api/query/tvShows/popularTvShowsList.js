"use server";
import catchAsyncError from "@lib/catchAsyncError";
import { getReq } from "@utils/api/serverApi";

const popularTvShowsList = catchAsyncError(async (page = 1) => {
  const tv = await getReq("/tv/popular", { params: { page } });

  const response = {
    message: "Popular TV Shows",
    page: tv?.page,
    totalPages: tv?.total_pages,
    data: tv?.results,
  };

  return response;
});

export default popularTvShowsList;
