"use server";

import catchAsyncError from "@lib/catchAsyncError";
import User from "@models/UserModel";
import cookieOptions from "@utils/auth/cookieOptions";
import generateWebToken from "@utils/auth/generateWebToken";
import environment from "@utils/environment";
import connectToDB from "@utils/mongoose/connectToDB";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const userSignUp = catchAsyncError(async (obj) => {
  const { name, email, password } = obj;

  if (!name || !email || !password) {
    throw new Error("All field is needed");
  }

  await connectToDB();

  const hashPassword = bcrypt.hashSync(password, environment.SALT_ROUND);

  const createUser = await User.create({
    name,
    email,
    password: hashPassword,
  });

  const token = generateWebToken({
    id: createUser._id,
    role: createUser.role,
  });


  cookies().set("token", token, cookieOptions);

  // Serialize the createUser object
  const createUserSerialized = {
    _id: createUser._id.toString(),
    name: createUser.name,
    email: createUser.email,
  };

  return createUserSerialized;
});

export default userSignUp;
