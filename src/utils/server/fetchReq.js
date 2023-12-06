/**
 * Making a Fetch request with path and params (if any).
 *
 * @param {String} path - should start with /.
 * @param {Object} params - Optional parameters for the fetch Request.
 * @returns {Response} json data will be returned.
 */

const fetchReq = async (path, params) => {
  const envUrl = process.env.THIRD_PARTY_URL;
  const accessToken = process.env.THIRD_PARTY_URL_ACCESS_TOKEN;

  const url = new URL(`${envUrl}${path}`);

  if (params) {
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
  }

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include your access token here
        "Content-Type": "application/json", // Include other headers as needed
      },
    });

    if (!res.ok) {
      const error = new Error(`Request failed with status ${res.status}`);
      error.status = res.status;
      throw error;
    }

    return res.json();
  } catch (error) {
    throw error;
  }
};

export default fetchReq;
