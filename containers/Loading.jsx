const Loading = ({ hScreen = false, small = false }) => {
  return (
    <div
      className={`  w-full flex justify-center items-center`}
      style={{ height: hScreen ? "calc(100vh - 200px)" : "100%" }}
    >
      <div className={small ? "small_loading" : "loading"} />
    </div>
  );
};

export default Loading;
