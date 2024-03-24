"use client";

const Loading = ({ hScreen = false, small = false }) => {
  return (
    <div
      className={`${
        hScreen ? "h-screen" : "h-full"
      }  w-full flex justify-center items-center`}
    >
      <div className={small ? "small_loading" : "loading"} />
    </div>
  );
};

export default Loading;
