"use client";

import { useRouter } from "next/navigation";

const AuthError = ({ error }) => {
  // const router = useRouter();

  // router.push(`/login?msg=${"Please login"}`);

  // return null;

  return <p>{error.message}</p>;
};

export default AuthError;
