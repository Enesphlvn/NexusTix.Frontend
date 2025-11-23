import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import logoImage from '../../../assets/logo.png';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.roles?.includes("Admin");

  const handleLogout = () => {
    logout();

    toast.info("Başarıyla çıkış yapıldı.", {
      position: "top-right",
      autoClose: 2000,
    });

    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logo}>
          <img src={logoImage} alt="NexusTix Logo" className={styles.logoImage}/>
        </Link>
      </div>

      <div className={styles.searchBar}></div>

      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>
          Anasayfa
        </Link>

        {isAuthenticated ? (
          <>
            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className={styles.navLink}
                style={{ color: "#dc3545", fontWeight: "bold" }}
              >
                Yönetim Paneli
              </Link>
            )}

            <span className={styles.navLink}>
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Hoş geldin, {user?.fullName.split(" ")[0]}
              </Link>
            </span>

            <Link to="/my-tickets" className={styles.navLink}>
              Biletlerim
            </Link>

            <button onClick={handleLogout} className={styles.buttonSecondary}>
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
