"use server";
import catchAsyncError from "@lib/catchAsyncError";
import sendingEmail from "@utils/email";
import { encrypt } from "@utils/encryption/encryptAndDecrypt";
import generate8digitNumber from "@utils/javascript/generate8digitNumber";
import { otpTemplate } from "@utils/otpTemplate";
import { cookies } from "next/headers";

const userSignUp = catchAsyncError(async (data) => {
  const otp = generate8digitNumber();

  const encryptData = encrypt({ ...data, otp });

  cookies().set("_sig", encryptData, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  const html = otpTemplate(otp);
  await sendingEmail(data.email, "Your OTP Code", html);
});

export default userSignUp;
