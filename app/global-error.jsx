"use client";

const global_error = ({ error }) => {
  return (
    <div>
      <p>global_error</p>
      <p>{error.message}</p>
    </div>
  );
};

export default global_error;
