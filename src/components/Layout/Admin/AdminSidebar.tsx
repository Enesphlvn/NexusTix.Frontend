import { Link, useLocation } from "react-router-dom";
import styles from "./AdminSidebar.module.css";

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname.startsWith(path) ? styles.activeLink : "";

  return (
    <aside className={styles.sidebar}>
      <Link to="/admin/dashboard" className={styles.logo}>
        NEXUSTIX <span className={styles.logoHighlight}>.ADMIN</span>
      </Link>

      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <Link to="/admin/dashboard" className={isActive("/admin/dashboard")}>
            📊 Dashboard
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/admin/events" className={isActive("/admin/events")}>
            📅 Etkinlik Yönetimi
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/admin/venues" className={isActive("/admin/venues")}>
            📍 Mekan Yönetimi
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/admin/users" className={isActive("/admin/users")}>
            👥 Kullanıcılar
          </Link>
        </li>
      </ul>

      <div className={styles.footer}>
        <Link to="/" className={styles.backButton}>
          ← Siteye Dön
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
