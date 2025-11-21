import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import { FaHome } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.glow}></div>

      <div className={styles.errorCode}>404</div>

      <h1 className={styles.title}>Sahne Boş Kaldı!</h1>

      <p className={styles.description}>
        Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
        Endişelenmeyin, sizi ana sahneye geri götürebiliriz.
      </p>

      <Link to="/" className={styles.homeButton}>
        <FaHome />
        <span>Ana Sayfaya Dön</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;
