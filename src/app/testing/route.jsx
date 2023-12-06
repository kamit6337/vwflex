import Req from "@utils/server/Req";

export const GET = async (request) => {
  const { params, cookies } = Req(request);

  const { cookie_1 } = cookies;

  return Response.json({ params, cookies, cookie_1 });
};
