"use server";
import catchAsyncError from "@lib/catchAsyncError";
import serverAxios from "@utils/server/serverAxios";

const onTheAirList = catchAsyncError(async (page = 1) => {
  const tv = await serverAxios.get("/tv/on_the_air", { params: { page } });

  const response = {
    message: "On The Air TV Shows",
    page: tv?.page,
    totalPages: tv?.total_pages,
    data: tv?.results,
  };

  return response;
});

export default onTheAirList;
