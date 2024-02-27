"use client";

import { useState, useEffect } from "react";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Function to check if the window scroll is below 300px
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Event listener for scrolling
    window.addEventListener("scroll", toggleVisibility);

    // Clean up function
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  return (
    <div className="fixed bottom-0 right-0 mb-10 mr-10" style={{ zIndex: 999 }}>
      {isVisible && (
        <button onClick={scrollToTop} className="">
          Scroll to Top
        </button>
      )}
    </div>
  );
}

export default ScrollToTop;
