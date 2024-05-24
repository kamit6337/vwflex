"use server";

import catchAsyncError from "@lib/catchAsyncError";
import User from "@models/UserModel";
import verifyWebToken from "@utils/auth/verifyWebToken";
import connectToDB from "@utils/mongoose/connectToDB";
import { cookies } from "next/headers";

const checkUserLogin = catchAsyncError(async () => {
  const token = cookies().get("token");

  if (!token) {
    throw new Error("You session has expired. Please login again");
  }

  const decoded = verifyWebToken(token.value);

  await connectToDB();

  const findUser = await User.findOne({ _id: decoded.id }).lean();

  if (!findUser) {
    throw new Error("Please Login again");
  }

  return true;
});

export default checkUserLogin;
