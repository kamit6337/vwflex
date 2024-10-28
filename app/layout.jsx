import "./globals.css";
import { Poppins } from "next/font/google";
import ScrollToTop from "@lib/ScrollToTop";
import OfflineDetector from "@lib/OfflineDetector";
import ApolloClientProvider from "@providers/ApolloClientProvider";

// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata = {
  title: "VwFlex",
  description: "On Demand Movies and Tv Shows",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <link rel="icon" href="/vwflex_favicon1.png" sizes="any" />
      <body className="w-full h-screen">
        <OfflineDetector />
        <ApolloClientProvider>
          <main>{children}</main>
          <ScrollToTop />
        </ApolloClientProvider>
      </body>
    </html>
  );
}
