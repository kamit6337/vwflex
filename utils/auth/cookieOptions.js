import environment from "@utils/environment";

const PRODUCTION = "production";

const cookieOptions = {
  httpOnly: true,
  maxAge: environment.JWT_EXPIRES_IN, // in milliseconds
  secure: environment.NODE_ENV === PRODUCTION,
};

export default cookieOptions;
