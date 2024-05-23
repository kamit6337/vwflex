"use server";
import catchAsyncError from "@lib/catchAsyncError";
import { getReq } from "@utils/api/serverApi";

const popularPeoples = catchAsyncError(async (page = 1) => {
  const peoples = await getReq("/person/popular", {
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
