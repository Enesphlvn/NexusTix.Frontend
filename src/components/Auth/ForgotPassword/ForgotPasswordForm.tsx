import { Link } from "react-router-dom";
import styles from "./ForgotPasswordForm.module.css";
import { FaArrowLeft, FaLock } from "react-icons/fa";

interface ForgotPasswordFormProps {
  email: string;
  setEmail: (val: string) => void;
  loading: boolean;
  error: string | null;
  handleSubmit: (e: React.FormEvent) => void;
}

const ForgotPasswordForm = ({
  email,
  setEmail,
  loading,
  error,
  handleSubmit,
}: ForgotPasswordFormProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
            color: "#007bff",
            fontSize: "2rem",
          }}
        >
          <FaLock />
        </div>
        <h1 className={styles.title}>Şifremi Unuttum</h1>
        <p className={styles.description}>
          Lütfen hesabınıza kayıtlı e-posta adresini giriniz.
        </p>

        <form onSubmit={handleSubmit}>
          {error && <div className={styles.errorMessage}>{error}</div>}
          <div className={styles.formGroup}>
            <label>E-posta Adresi</label>
            <input
              type="email"
              className={styles.input}
              placeholder="ornek@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Gönderiliyor..." : "Sıfırlama Bağlantısı Gönder"}
          </button>
        </form>

        <Link to="/login" className={styles.backLink}>
          <FaArrowLeft style={{ marginRight: "5px" }} /> Giriş Ekranına Dön
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
