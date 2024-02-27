import checkUserLogin from "@api/query/auth/checkUserLogin";
import Footer from "@components/Footer/Footer";
import Navbar from "@components/Navbar/Navbar";
import ScrollToTop from "@components/ScrollToTop";
import { redirect } from "next/navigation";

const MainLayout = async ({ children }) => {
  // const isUserLoggedIn = await checkUserLogin();

  // if (!isUserLoggedIn) {
  //   return redirect("/login");
  // }

  return (
    <>
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
    </>
  );
};

export default MainLayout;
