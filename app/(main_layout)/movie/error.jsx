"use client";

import ShowErrorMsg from "@components/ShowErrorMsg";

const error = ({ error }) => {
  return <ShowErrorMsg message={error.message} />;
};

export default error;
