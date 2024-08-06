"use server";

import catchAsyncError from "@lib/catchAsyncError";
import User from "@models/UserModel";
import environment from "@utils/environment";
import connectToDB from "@utils/mongoose/connectToDB";
import { encrypt } from "@utils/encryption/encryptAndDecrypt";
import resetPasswordTemplate from "@utils/resetPasswordTemplate";
import sendingEmail from "@utils/email";

const sendNewPasswordLink = catchAsyncError(async (email) => {
  if (!email) {
    throw new Error("Email is not provided");
  }

  await connectToDB();

  const findUser = await User.findOne({ email });

  if (!findUser) {
    throw new Error("You are not our customer");
  }

  // MARK: GENERATE TOKEN BASED ON USER ID AND ITS EMAIL
  const token = encrypt(
    { id: findUser._id, email: findUser.email },
    15 * 60 * 1000
  );

  const otpUrl = `${environment.SERVER_URL}/createNewPassword?token=${token}&email=${email}`;

  const html = resetPasswordTemplate(otpUrl);

  await sendingEmail(email, "Your Reset Password Link", html);
});

export default sendNewPasswordLink;
