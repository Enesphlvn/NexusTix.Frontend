import { Link, useLocation } from "react-router-dom";
import styles from "./AdminSidebar.module.css";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaChartPie,
  FaMapMarkerAlt,
  FaQrcode,
  FaUsers,
} from "react-icons/fa";

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
            <FaChartPie className={styles.menuIcon} /> Dashboard
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/admin/events" className={isActive("/admin/events")}>
            <FaCalendarAlt className={styles.menuIcon} /> Etkinlik Yönetimi
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/admin/venues" className={isActive("/admin/venues")}>
            <FaMapMarkerAlt className={styles.menuIcon} /> Mekan Yönetimi
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/admin/users" className={isActive("/admin/users")}>
            <FaUsers className={styles.menuIcon} /> Kullanıcılar
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/admin/checkin" className={isActive("/admin/checkin")}>
            <FaQrcode className={styles.menuIcon} /> Check In
          </Link>
        </li>
      </ul>

      <div className={styles.footer}>
        <Link to="/" className={styles.backButton}>
          <FaArrowLeft style={{ marginRight: "0.5rem" }} /> Siteye Dön
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
