/**
 * This function generate JWT
 * @param {Object} token Provide token to verify.
 * @param {String} secret You can provide secret key through which token would be verify.
 * @returns {Object} Return Object that was provided or throw an error if occur.
 *
 */

import environment from "@utils/environment";
import jwt from "jsonwebtoken";

const verifyWebToken = (token, secret = environment.JWT_SECRET_KEY) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.log("verify token error", error);
    throw error;
  }
};

export default verifyWebToken;
