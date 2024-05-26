import { getProviders } from "next-auth/react";

export const metadata = () => {
  return {
    title: "Login",
    description: "This is the Login Page",
  };
};

const layout = async ({ children }) => {
  await getProviders();

  return <>{children}</>;
};

export default layout;
