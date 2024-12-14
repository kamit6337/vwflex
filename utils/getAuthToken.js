import { cookies } from "next/headers";

function getAuthToken() {
  return cookies().get("_use")?.value || "";
}

export default getAuthToken;
