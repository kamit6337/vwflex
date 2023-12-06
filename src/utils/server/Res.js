/**
 * Sending the Response to Client
 * @param {Object} data Response data that will send.
 * @param {Number} expiresIn this should be SECONDS. 
 * @returns response with status and cookie (if provided).
 */

const Res = (
  data,
  {
    status = 200,
    cookie: { key, value } = {},
    path = "/",
    expiresIn = 3600,
  } = {}
) => {
  const cookieOptions = {
    path,
    maxAge: expiresIn, // in seconds
  };

  // Set the cookie in the headers if cookieName and cookieValue are provided
  const headers = {
    "Content-Type": "application/json",
    ...(key &&
      value && {
        "Set-Cookie": `${cookieName}=${cookieValue}; HttpOnly; ${Object.entries(
          cookieOptions
        )
          .map(([key, value]) => `${key}=${value}`)
          .join("; ")}`,
      }),
  };

  return new Response(JSON.stringify(data), {
    status,
    headers,
  });
};

export default Res;
