"use server";

import catchAsyncError from "@lib/catchAsyncError";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const logout = catchAsyncError(async () => {
  cookies().delete("token");
  redirect("/login");
});

export default logout;
