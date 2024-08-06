"use server";

import catchAsyncError from "@lib/catchAsyncError";
import User from "@models/UserModel";
import { decrypt } from "@utils/encryption/encryptAndDecrypt";
import environment from "@utils/environment";
import bcrypt from "bcryptjs";

const newPassword = catchAsyncError(async (email, token, password) => {
  if (!email || !token || !password) {
    throw new Error("All fields is required");
  }

  const decoded = decrypt(token);

  const currentDate = Date.now();

  if (currentDate > decoded.exp) {
    throw new Error(
      "Link has expired. Click on Forgot Password to send new link"
    );
  }

  if (email !== decoded.email) {
    throw new Error("Issue in create new Password");
  }

  const hashPassword = bcrypt.hashSync(password, environment.SALT_ROUND);

  await User.findOneAndUpdate(
    {
      _id: decoded.id,
    },
    {
      password: hashPassword,
      updatedAt: Date.now(),
    }
  );
});

export default newPassword;
