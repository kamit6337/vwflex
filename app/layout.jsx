import "./globals.css";
import { Poppins } from "next/font/google";
import ReactReduxProvider from "@providers/ReactReduxProvider";
import ScrollToTop from "@lib/ScrollToTop";
import connectToDB from "@utils/mongoose/connectToDB";
import OfflineDetector from "@lib/OfflineDetector";
import ReactQueryProvider from "@providers/ReactQueryProvider";

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
  await connectToDB();

  return (
    <html lang="en" className={poppins.className}>
      <body className="w-full h-screen">
        <OfflineDetector />
        <ReactQueryProvider>

        <ReactReduxProvider>
          <main>{children}</main>
          <ScrollToTop />
        </ReactReduxProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
