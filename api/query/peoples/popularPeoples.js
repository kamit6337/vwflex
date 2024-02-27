"use server";
import catchAsyncError from "@lib/catchAsyncError";
import serverAxios from "@utils/server/serverAxios";

const popularPeoples = catchAsyncError(async (page = 1) => {
  const peoples = await serverAxios.get("/person/popular", {
    params: { page },
  });

  const response = {
    message: "Popular Peoples List",
    page: peoples.page,
    totalPages: peoples.total_pages,
    data: peoples.results,
  };

  return response;
});

export default popularPeoples;
