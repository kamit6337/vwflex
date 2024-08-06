"use server";
import catchAsyncError from "@lib/catchAsyncError";
import User from "@models/UserModel";
import cookieOptions from "@utils/auth/cookieOptions";
import { encrypt } from "@utils/encryption/encryptAndDecrypt";
import connectToDB from "@utils/mongoose/connectToDB";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const userLogin = catchAsyncError(async (obj) => {
  const { email, password } = obj;

  if (!email || !password) {
    throw new Error("Email or Password must be provided");
  }

  await connectToDB();

  const findUser = await User.findOne({ email }).select("+password").lean();

  if (!findUser) {
    throw new Error("Email  is incorrect");
  }

  const isPasswordCorrect = bcrypt.compareSync(
    String(password),
    findUser.password
  ); // Boolean

  if (!isPasswordCorrect) {
    throw new Error("Password is incorrect");
  }

  const encryptUser = encrypt({ id: findUser._id, role: findUser.role });

  cookies().set("token", encryptUser, cookieOptions);

  return JSON.parse(JSON.stringify(findUser));
});

export default userLogin;
