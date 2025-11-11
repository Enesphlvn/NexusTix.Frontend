import { Link } from "react-router-dom";
import styles from "../Layout/Navbar.module.css";

const Navbar = () => {
  // const isLoggedIn = false;

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logo}>
          NexusTix
        </Link>
      </div>

      <div className={styles.searchBar}>
        {/* <input type="text" placeholder="Etkinlik ara..." /> */}
      </div>

      <div className={styles.navLinks}>
        <Link to="/cities" className={styles.navLink}>
          Şehirler
        </Link>
        <Link to="/events" className={styles.navLink}>
          Etkinlikler
        </Link>

        {/* AuthContext kurulduğunda bu dinamik olacak:
            {isLoggedIn ? (
                <>
                    <Link to="/my-tickets" className={styles.navLink}>Biletlerim</Link>
                    <button className={styles.buttonSecondary}>Çıkış Yap</button>
                </>
            ) : (
                <>
                    <Link to="/login" className={styles.buttonSecondary}>Giriş Yap</Link>
                    <Link to="/register" className={styles.buttonPrimary}>Kayıt Ol</Link>
                </>
            )}
        */}

        <Link to="/login" className={styles.buttonSecondary}>
          Giriş Yap
        </Link>
        <Link to="/register" className={styles.buttonPrimary}>
          Kayıt Ol
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
