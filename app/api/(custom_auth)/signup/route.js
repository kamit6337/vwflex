import User from "@models/UserModel";
import generateWebToken from "@utils/auth/generateWebToken";
import environment from "@utils/environment";
import connectToDB from "@utils/mongoose/connectToDB";
import Req from "@utils/server/Req";
import Res from "@utils/server/Res";
import { cookies } from "next/headers";

export const POST = async (req) => {
  const { body } = Req(req);

  const { name, email, password } = await body();

  if (!name || !email || !password) {
    return Res({ message: "All field is needed" }, { status: 404 });
  }

  try {
    await connectToDB();

    const createUser = await User.create({
      name,
      email,
      password,
    });

    if (!createUser) {
      return Res({ message: "Issue in signup" }, { status: 404 });
    }

    const token = generateWebToken({
      id: createUser._id,
      role: createUser.role,
    });

    const oneDay = 24 * 60 * 60 * 1000;

    cookies().set("token", token, {
      httpOnly: true,
      expires: Date.now() + oneDay,
      domain: "localhost:3000",
    });

    return Res({ message: "SignUp Successfully", user: createUser });
  } catch (error) {
    return Res({ error: error.message }, { status: error.status || 500 });
  }
};
