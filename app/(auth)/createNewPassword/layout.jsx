import Loading from "@containers/Loading";
import { Suspense } from "react";

export const metadata = () => {
  return {
    title: "Create New Password",
    description: "This is the Create New Password Page",
  };
};

const layout = ({ children }) => {
  return (
    <>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
};

export default layout;
