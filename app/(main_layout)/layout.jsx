import Footer from "@components/Footer/Footer";
import Navbar from "@components/Navbar/Navbar";
import UserLoginProvider from "@providers/UserLoginProvider";
import GlobalShow from "./GlobalShow";
import checkUserLogin from "@api/query/auth/checkUserLogin";
import connectToDB from "@utils/mongoose/connectToDB";

const MainLayout = async ({ children }) => {
  await connectToDB();

  await checkUserLogin();

  return (
    <UserLoginProvider>
      <section
        className="w-full h-14 bg-my_bg flex justify-center sticky top-0"
        style={{ zIndex: 999 }}
      >
        <Navbar />
      </section>
      <section className="w-full">{children}</section>
      <section className="w-full h-[500px] text-white">
        <Footer />
      </section>
      <GlobalShow />
    </UserLoginProvider>
  );
};

export default MainLayout;
