"use client";

const error = ({ error }) => {
  return (
    <div>
      <p>{error.message}</p>
    </div>
  );
};

export default error;
