"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const OAuthPage = ({ token }) => {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("_use", token);
    router.push("/");
  }, []);

  return null;
};

export default OAuthPage;
