/**
 * Pass the Incoming request to this function that return complete different parameter
 * @param {Object} request passing the incoming request to these function
 * @param {Object} params params in key-value pair in object
 * @param {Object} cookies cookie in key-value pair in object
 * @param {[Object]} cookiesAll cookie in key-value pair inside an Array
 * @returns a detailed request options like params, cookies, cookiesAll
 */

const Req = (request) => {
  const { searchParams, href, search, host, hostname, pathname } = new URL(
    request.url
  );
  const res = {
    href,
    search,
    host,
    hostname,
    pathname,
  };

  // NOTE: GETTING ALL COOKIES
  let cookieList = request.cookies.getAll();
  cookieList = cookieList.map((cookie) => {
    let { name, value } = cookie;
    name = name.toLowerCase();

    return { [name]: value };
  });
  res.cookiesAll = cookieList;

  // NOTE: SEPARATING SINGLE COOKIE IN KEY-VALUE PAIR
  let cookies = {};
  cookieList?.forEach((cookie) => {
    cookies = { ...cookies, ...cookie };
  });
  res.cookies = cookies;

  // NOTE: IF SEARCHPARAMS IS PRESENT THEN GET ALL SEARCH-PARAMS IN KEY VALUE PAIR
  if (searchParams) {
    res.query = Object.fromEntries(searchParams.entries());
  }

  return { ...res };
};

export default Req;
