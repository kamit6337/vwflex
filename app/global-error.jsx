"use client";

import GeneralError from "@components/GeneralError";

const GlobalError = ({ error }) => {
  return (
    <html>
      <body>
        {/* <GeneralError hScreen={true} /> */}
        <p>Global error</p>
        <p>{error.message}</p>
      </body>
    </html>
  );
};

export default GlobalError;
