import React from "react";
import SignUp from "./SignUp";

export const metadata = () => {
  return {
    title: "Sign Up",
    description: "This is the Sign Up Page",
  };
};

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;
