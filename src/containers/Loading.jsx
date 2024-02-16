"use client";

const Loading = ({ hScreen = false }) => {
  return (
    <div
      className={`${
        hScreen ? "h-screen" : "h-full"
      }  w-full flex justify-center items-center`}
    >
      <div className="loading" />
    </div>
  );
};

export default Loading;
