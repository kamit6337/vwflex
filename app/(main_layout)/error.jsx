"use client";

const ErrorPage = ({ error }) => {
  return (
    <div>
      <p>Error from Page </p>
      <p>{error.message}</p>
    </div>
  );
};

export default ErrorPage;
