import Login from "./Login";

export const metadata = () => {
  return {
    title: "Login",
    description: "This is the Login Page",
  };
};

const LoginPage = ({ searchParams }) => {
  const msg = searchParams?.msg || "";

  return <Login msg={msg} />;
};

export default LoginPage;
