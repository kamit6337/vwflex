const LoginErrorPage = ({ searchParams: { error } }) => {
  return (
    <div>
      <p>Error due to login</p>
      <p>{error}</p>
    </div>
  );
};

export default LoginErrorPage;
