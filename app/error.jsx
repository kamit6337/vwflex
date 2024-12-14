"use client";

import { useRouter } from "next/navigation";

const MainLayoutLayoutError = ({ error }) => {
  // const router = useRouter();

  // router.push(`/login?msg=${"Please login"}`);

  // return null;

  return <p>{error.message}</p>;
};

export default MainLayoutLayoutError;
