/**
 * Making a Fetch request to Route Handler with path and params (if any).
 *
 * @param {String} path - should start with /.
 * @param {Object} params - Optional parameters for the fetch Request.
 * @param {Number} revalidateIn - in SECONDS. Default is 60 Seconds
 * @param {String} tagName - which later used to on-demand revalidation
 * @param {Boolean} cache - Default is TRUE. If don't want to cache make it FALSE
 * @returns {Response} json data will be returned.
 */

const GetReq = async (
  path,
  params
  // { revalidateIn, tagName, cache = true } = {}
) => {
  const url = new URL(`http://localhost:3000/api${path}`);

  if (params) {
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
  }

  try {
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Include other headers as needed
      },
      credentials: "include",
      // cache: cache ? "force-cache" : "no-cache",
    };

    // Conditionally add revalidateIn and tagName to fetchOptions
    // if (revalidateIn) {
    //   fetchOptions.next = { revalidate: revalidateIn };
    // }

    // if (tagName) {
    //   fetchOptions.next = { ...(fetchOptions.next || {}), tags: [tagName] };
    // }

    const res = await fetch(url, fetchOptions);

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

export default GetReq;
