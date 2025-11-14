import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Navbar />

      <main className={styles.content}>
        <Outlet />
      </main>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default MainLayout;
