"use server";

import catchAsyncError from "@lib/catchAsyncError";
import serverAxios from "@utils/server/serverAxios";

const fetchTv = catchAsyncError(async (id) => {
  if (!id) {
    throw new Error("ID is not provided");
  }

  const response = await serverAxios.get(`/tv/${id}`);
  return response;
});

export default fetchTv;
