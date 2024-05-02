"use server";

import catchAsyncError from "@lib/catchAsyncError";
import User from "@models/UserModel";
import verifyWebToken from "@utils/auth/verifyWebToken";
import makeSerializable from "@utils/javascript/makeSerializable";
import connectToDB from "@utils/mongoose/connectToDB";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const checkUserLogin = catchAsyncError(async () => {
  const token = cookies().get("token");

  if (!token) {
    redirect("/login?msg=You session has expired. Please login again.");
  }

  const decoded = verifyWebToken(token.value);

  await connectToDB();

  const findUser = await User.findOne({ _id: decoded.id }).lean();

  if (!findUser) {
    redirect("/login?msg=Please Login again");
  }

  return makeSerializable(findUser);
});

export default checkUserLogin;
