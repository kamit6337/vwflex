import User from "@models/UserModel";
import generateWebToken from "@utils/auth/generateWebToken";
import connectToDB from "@utils/mongoose/connectToDB";
import Req from "@utils/server/Req";
import Res from "@utils/server/Res";
import { cookies } from "next/headers";

export const POST = async (req) => {
  const { body } = Req(req);

  const { email, password } = await body();

  if (!email || !password) {
    return Res({ message: "All field is needed" }, { status: 404 });
  }

  try {
    await connectToDB();

    const findUser = await User.findOne({ email });

    if (!findUser) {
      return Res(
        { message: "Email or Password is incorrect" },
        { status: 403 }
      );
    }

    const isPasswordCorrect = findUser.checkPassword(password);

    if (!isPasswordCorrect) {
      return Res(
        { message: "Email or Password is incorrect" },
        { status: 403 }
      );
    }

    const token = generateWebToken({
      id: findUser._id,
      role: findUser.role,
    });

    console.log("token generated", token);

    const oneDay = 24 * 60 * 60 * 1000;

    cookies().set("token", token, {
      httpOnly: true,
      expires: Date.now() + oneDay,
    });

    return Res({ message: "successful login", user: findUser });
  } catch (error) {
    return Res({ error: error }, { status: 500 });
  }
};
