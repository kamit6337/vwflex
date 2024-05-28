"use server";

import catchAsyncError from "@lib/catchAsyncError";
import User from "@models/UserModel";
import generateWebToken from "@utils/auth/generateWebToken";
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

  const token = generateWebToken({
    id: findUser._id,
    role: findUser.role,
  });

  const oneDay = 24 * 60 * 60 * 1000;

  cookies().set("token", token, {
    httpOnly: true,
    expires: Date.now() + oneDay,
  });

  const findUserSerializable = {
    _id: findUser._id.toString(),
    name: findUser.name,
    email: findUser.email,
  };

  return findUserSerializable;
});

export default userLogin;
