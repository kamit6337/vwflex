import { redirect } from "next/navigation";
import OAuthPage from "./OAuthPage";

export const metadata = () => {
  return {
    title: "OAuth Verify",
    description: "verify Google OAuth login",
  };
};

const OAuthLoginVerifyPage = ({ searchParams }) => {
  const use = searchParams?.use;

  if (!use) {
    redirect("/login?msg=IssueInOAuthlogin");
  }

  return <OAuthPage token={use} />;
};

export default OAuthLoginVerifyPage;
