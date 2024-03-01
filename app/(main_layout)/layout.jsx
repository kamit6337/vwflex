import Footer from "@components/Footer/Footer";
import Navbar from "@components/Navbar/Navbar";
import UserLoginProvider from "@providers/UserLoginProvider";

const MainLayout = async ({ children }) => {
  return (
    <UserLoginProvider>
      <section
        className="w-full h-14 bg-my_bg flex justify-center sticky top-0"
        style={{ zIndex: 999 }}
      >
        <Navbar />
      </section>
      <section className="w-full">{children}</section>
      <section className="w-full h-96 bg-slate-600 text-white">
        <Footer />
      </section>
    </UserLoginProvider>
  );
};

export default MainLayout;
