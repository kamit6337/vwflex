"use server";

import catchAsyncError from "@lib/catchAsyncError";
import serverAxios from "@utils/server/serverAxios";

const airingTodayList = catchAsyncError(async (page = 1) => {
  const tv = await serverAxios.get("/tv/airing_today", {
    params: { page },
  });

  const response = {
    message: "Airing Today TV Shows",
    page: tv?.page,
    totalPages: tv?.total_pages,
    data: tv?.results,
  };

  return response;
});

export default airingTodayList;
