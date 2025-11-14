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
          <h3 style={{ margin: 0, color: "#444" }}>Yönetim Paneli</h3>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                {user?.fullName}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#888" }}>
                Administrator
              </div>
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
