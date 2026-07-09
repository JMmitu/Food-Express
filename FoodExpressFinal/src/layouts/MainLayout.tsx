import { Outlet } from "react-router-dom";
import TopBar from "../components/layout/TopBar";
import Navbar from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

const MainLayout = () => {
  return (
    <>
      <TopBar />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
