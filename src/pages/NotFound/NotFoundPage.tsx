import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.errorCode}>404</div>
      <h1 className={styles.title}>Sayfa Bulunamadı</h1>
      <p className={styles.description}>
        Aradığınız sayfa silinmiş, taşınmış veya hiç var olmamış olabilir. Ana
        sayfaya dönerek yaklaşan etkinliklere göz atabilirsiniz.
      </p>
      <Link to="/" className={styles.homeButton}>
        Ana Sayfaya Dön
      </Link>
    </div>
  );
};

export default NotFoundPage;
