"use server";

import catchAsyncError from "@lib/catchAsyncError";
import User from "@models/UserModel";
import verifyWebToken from "@utils/auth/verifyWebToken";
import makeSerializable from "@utils/javascript/makeSerializable";
import connectToDB from "@utils/mongoose/connectToDB";
import { cookies } from "next/headers";

const checkUserLogin = catchAsyncError(async () => {
  const token = cookies().get("token");

  if (!token) {
    return false;
  }

  const decoded = verifyWebToken(token.value);

  if (!decoded) {
    return false;
  }

  await connectToDB();

  const findUser = await User.findOne({ _id: decoded.id }).lean();

  if (!findUser) {
    return false;
  }

  return makeSerializable(findUser);
});

export default checkUserLogin;
