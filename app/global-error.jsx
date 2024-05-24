"use client";

import GeneralError from "@components/GeneralError";

const GlobalError = ({ error }) => {
  return (
    <html>
      <body>
        <GeneralError hScreen={true} />
      </body>
    </html>
  );
};

export default GlobalError;
