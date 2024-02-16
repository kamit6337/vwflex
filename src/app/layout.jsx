import "./globals.css";
import Navbar from "@components/Navbar/Navbar";
import Footer from "@components/Footer/Footer";

import { Poppins } from "next/font/google";
import ScrollToTop from "@components/ScrollToTop";

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
      <body className="w-full">
        <section
          className="w-full h-14 bg-my_bg flex justify-center font-semibold text-xl sticky top-0"
          style={{ zIndex: 999 }}
        >
          <Navbar />
        </section>
        <section className="w-full">{children}</section>
        <section className="w-full h-96 bg-slate-600 text-white">
          <Footer />
        </section>
        <ScrollToTop />
      </body>
    </html>
  );
}
