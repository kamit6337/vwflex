"use client";

import { useRouter } from "next/navigation";

const LoginError = ({ error }) => {
  const router = useRouter();

  router.push(`/login?msg=${"Please login"}`);

  return null;
};

export default LoginError;
