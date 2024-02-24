"use client";

const error = ({ error }) => {
  return (
    <div>
      <p>Error from main layout</p>
      <p>{error.message}</p>
    </div>
  );
};

export default error;
