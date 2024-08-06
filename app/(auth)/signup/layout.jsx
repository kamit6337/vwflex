import { getProviders } from "next-auth/react";

export const metadata = () => {
  return {
    title: "Sign Up",
    description: "This is the Sign Up Page",
  };
};

const layout = async ({ children }) => {
  return <>{children}</>;
};

export default layout;
