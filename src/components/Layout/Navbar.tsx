import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logo}>
          NexusTix
        </Link>
      </div>

      <div className={styles.searchBar}></div>

      <div className={styles.navLinks}>
        <Link to="/cities" className={styles.navLink}>
          Şehirler
        </Link>
        <Link to="/events" className={styles.navLink}>
          Etkinlikler
        </Link>

        {isAuthenticated ? (
          <>
            <span className={styles.navLink}>
              Hoş geldin, {user?.fullName.split(" ")[0]}
            </span>

            <Link to="/my-tickets" className={styles.navLink}>
              Biletlerim
            </Link>

            <button onClick={logout} className={styles.buttonSecondary}>
              Çıkış Yap
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.buttonSecondary}>
              Giriş Yap
            </Link>
            <Link to="/register" className={styles.buttonPrimary}>
              Kayıt Ol
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
