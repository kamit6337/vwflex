"use client";

const error = ({ error }) => {
  return (
    <div>
      <p>error in acheiving movie details</p>
      <p>{error}</p>
    </div>
  );
};

export default error;
