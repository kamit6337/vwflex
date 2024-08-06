"use server";
import catchAsyncError from "@lib/catchAsyncError";
import User from "@models/UserModel";
import { decrypt } from "@utils/encryption/encryptAndDecrypt";
import connectToDB from "@utils/mongoose/connectToDB";
import { cookies } from "next/headers";

const checkUserLogin = catchAsyncError(async () => {
  const token = cookies().get("token");

  if (!token?.value) {
    return false;
  }

  const decoded = decrypt(token.value);

  if (!decoded) {
    return false;
  }

  await connectToDB();

  const findUser = await User.findOne({ _id: decoded.id }).lean();

  if (!findUser) {
    return false;
  }

  return JSON.parse(JSON.stringify(findUser));
});

export default checkUserLogin;
