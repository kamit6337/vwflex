"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginError = ({ error }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/login?msg=${"Please login"}`);
  }, []);

  return null;
};

export default LoginError;
