"use client";

import { useRouter } from "next/navigation";

const MainLayoutError = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/login?msg=${"Please login"}`);
  }, []);

  return null;
};

export default MainLayoutError;
