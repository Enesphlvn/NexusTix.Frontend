import { Outlet } from "react-router-dom";
import styles from "../Layout/MainLayout.module.css";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Navbar />

      <main className={styles.content}>
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
