import Footer from "@components/Footer/Footer";
import Navbar from "@components/Navbar/Navbar";

const MainLayout = async ({ children }) => {
  return (
    <>
      <section
        className="w-full h-14 bg-background flex justify-center sticky top-0"
        style={{ zIndex: 26 }}
      >
        <Navbar />
      </section>
      <section className="w-full">{children}</section>
      <section className="w-full h-[500px]">
        <Footer />
      </section>
    </>
  );
};

export default MainLayout;
