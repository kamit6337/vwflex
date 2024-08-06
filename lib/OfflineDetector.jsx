"use client";

import { useState, useEffect } from "react";

const OfflineDetector = () => {
  const [isOnline, setIsOnline] = useState(
    typeof window !== "undefined" && window.navigator.onLine
  );

  const [showNetworkPage, setShowNetworkPage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isOnline) {
      setShowNetworkPage(false);
    } else {
      setShowNetworkPage(true);
    }
  }, [isOnline]);

  const refreshPage = () => {
    window.location.reload();
  };

  if (showNetworkPage) {
    return (
      <section
        className="w-full h-full fixed top-0 left-0 flex justify-center items-center backdrop-blur-md"
        style={{ zIndex: 9999 }}
      >
        <main className="max-w-96 border bg-white text-black p-10   rounded-md">
          <p className="text-lg font-semibold">Network problem</p>
          <p className="whitespace-nowrap">Check your internet connection</p>
          <p
            className="w-full border rounded-md py-2 cursor-pointer mt-5 text-center text-lg  hover:bg-gray-100"
            onClick={refreshPage}
          >
            Refresh
          </p>
        </main>
      </section>
    );
  }

  return null;
};

export default OfflineDetector;
