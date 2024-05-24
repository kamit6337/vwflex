const GeneralError = ({ hScreen = false }) => {
  const handleRefresh = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <section
      className={`${
        hScreen ? "h-screen" : "h-96"
      } w-full flex justify-center items-center`}
    >
      <main className="flex flex-col items-center gap-10 p-10 border border-white rounded">
        <p>Something went wrong. Please Refresh</p>
        <button onClick={handleRefresh} className="w-full py-2 bg-gray-400">
          Refresh
        </button>
      </main>
    </section>
  );
};

export default GeneralError;
