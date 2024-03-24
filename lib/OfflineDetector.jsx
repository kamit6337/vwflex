"use client";

import { useState, useEffect } from "react";

const OfflineDetector = () => {
  const [isOnline, setIsOnline] = useState(
    typeof window !== "undefined" && window.navigator.onLine
  );

  const [showNetworkPage, setShowNetworkPage] = useState(false);

  console.log("isonline", isOnline);
  console.log(
    "window.navigator.onLine",
    typeof window !== "undefined" && window.navigator.onLine
  );

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log("Browser is offline");
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

  if (showNetworkPage) {
    return (
      <section
        className="w-full h-full fixed top-0 left-0 flex justify-center items-center backdrop-blur-md"
        style={{ zIndex: 9999 }}
      >
        <main className="w-96 h-96 border bg-white text-black">
          <p>Network problem. Check your internet connection</p>
        </main>
      </section>
    );
  }

  return null;
};

export default OfflineDetector;
