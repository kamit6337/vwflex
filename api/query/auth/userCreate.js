"use server";
import catchAsyncError from "@lib/catchAsyncError";
import User from "@models/UserModel";
import cookieOptions from "@utils/auth/cookieOptions";
import { decrypt, encrypt } from "@utils/encryption/encryptAndDecrypt";
import environment from "@utils/environment";
import connectToDB from "@utils/mongoose/connectToDB";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const userCreate = catchAsyncError(async (givenOtp) => {
  const data = cookies().get("_sig");

  if (!data?.value) {
    throw new Error("Something went wrong");
  }

  const decryptedValue = decrypt(data.value);

  const { otp, name, email, password } = decryptedValue;

  if (Number(givenOtp) !== otp) {
    throw new Error("OTP is incorrect");
  }

  await connectToDB();

  const hashPassword = bcrypt.hashSync(password, environment.SALT_ROUND);

  const createUser = await User.create({
    name,
    email,
    password: hashPassword,
  });

  const encryptUser = encrypt({ id: createUser._id, role: createUser.role });

  cookies().set("token", encryptUser, cookieOptions);
  cookies().delete("_sig");
});

export default userCreate;
