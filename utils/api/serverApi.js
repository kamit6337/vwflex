import catchAsyncError from "@lib/catchAsyncError";
import environment from "@utils/environment";
import axios from "axios";

const BASE_URL = environment.THIRD_PARTY_URL;

export const getReq = catchAsyncError(async (path, { params } = {}) => {
  const response = await axios.get(`${BASE_URL}${path}`, {
    params: params,
    headers: {
      Authorization: `Bearer ${environment.THIRD_PARTY_URL_ACCESS_TOKEN}`, // Include your access token here
      "Content-Type": "application/json", // Include other headers as needed
    },
  });

  return response?.data;
});
