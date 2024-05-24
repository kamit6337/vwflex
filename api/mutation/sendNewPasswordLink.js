"use server";

import catchAsyncError from "@lib/catchAsyncError";
import User from "@models/UserModel";
import generateWebToken from "@utils/auth/generateWebToken";
import environment from "@utils/environment";
import connectToDB from "@utils/mongoose/connectToDB";
import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: environment.MY_GMAIL_ID,
    pass: environment.MY_GMAIL_PASSWORD,
  },
});

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
  const token = generateWebToken(
    {
      id: findUser._id,
      email: findUser.email,
    },
    {
      expires: 15 * 60 * 1000, //15 minutes
    }
  );

  const otpUrl = `${environment.SERVER_URL}/createNewPassword?token=${token}&email=${email}`;

  // Render HTML template with dynamic OTP
  const htmlTemplate = await ejs.renderFile(path.join("views", "otp.ejs"), {
    otpUrl,
  });

  // Set up email options
  const mailOptions = {
    from: `Vwflex ${environment.MY_GMAIL_ID}`,
    to: email,
    subject: "Your Reset Password Link for verification",
    html: htmlTemplate,
  };

  // Send email
  await transporter.sendMail(mailOptions);
});

export default sendNewPasswordLink;
