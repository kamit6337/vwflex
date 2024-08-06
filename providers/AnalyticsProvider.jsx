"use client";

import { initGA, logPageView } from "@/lib/analytics";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const AnalyticsProvider = ({ children, props }) => {
  const pathname = usePathname();

  useEffect(() => {
    initGA(props);
    logPageView(pathname);

    // Log each page change as a pageview with Google Analytics 4
    const handleRouteChange = () => {
      logPageView(pathname);
    };

    handleRouteChange(); // Log the initial page load
  }, [pathname, props]);

  return <>{children}</>;
};

export default AnalyticsProvider;
