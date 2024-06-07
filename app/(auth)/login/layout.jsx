import Loading from "@containers/Loading";
import { getProviders } from "next-auth/react";
import { Suspense } from "react";

export const metadata = () => {
  return {
    title: "Login",
    description: "This is the Login Page",
  };
};

const layout = async ({ children }) => {
  await getProviders();

  return (
    <>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
};

export default layout;
