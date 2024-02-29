import "./globals.css";
import { Poppins } from "next/font/google";
import ReactReduxProvider from "@providers/ReactReduxProvider";
import ScrollToTop from "@lib/ScrollToTop";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="w-full h-screen">
        <ReactReduxProvider>
          <main>{children}</main>
          <ScrollToTop />
        </ReactReduxProvider>
      </body>
    </html>
  );
}
