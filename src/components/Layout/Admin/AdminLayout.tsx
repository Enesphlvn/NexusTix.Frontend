import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./AdminLayout.module.css";
import AdminSidebar from "./AdminSidebar";
import { ToastContainer } from "react-toastify";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <AdminSidebar />

      <div className={styles.contentWrapper}>
        <header className={styles.header}>
          <h3 className={styles.headerTitle}>Yönetim Paneli</h3>

          <div className={styles.userActions}>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{user?.fullName}</div>
              <div className={styles.userRole}>Administrator</div>
            </div>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Çıkış
            </button>
          </div>
        </header>

        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>

      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
};

export default AdminLayout;
