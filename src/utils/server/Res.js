/**
 * Sending the Response to Client
 * @param {Number} status Status send to client (Default: 200)
 * @param {Object} data Response data that will send.
 * @param {Number} expiresIn this should be SECONDS.
 * @returns response with status and cookie (if provided).
 */

const Res = (data, { status } = {}) => {
  return new Response(JSON.stringify(data), {
    status,
  });
};

export default Res;
