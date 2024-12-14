"use client";

import GeneralError from "@components/GeneralError";

const error = ({ error }) => {
  return <p>{error.message}</p>;
};

export default error;
