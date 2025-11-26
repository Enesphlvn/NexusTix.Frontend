import { Link } from "react-router-dom";
import styles from "./ForgotPasswordForm.module.css";

interface ForgotPasswordFormProps {
  email: string;
  setEmail: (val: string) => void;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

const ForgotPasswordForm = ({
  email,
  setEmail,
  loading,
  handleSubmit,
}: ForgotPasswordFormProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h1 className={styles.title}>Şifremi Unuttum 🔒</h1>
        <p className={styles.description}>
          Lütfen hesabınıza kayıtlı e-posta adresini giriniz. Size şifrenizi
          sıfırlamanız için bir bağlantı göndereceğiz.
        </p>

        <form onSubmit={handleSubmit}>
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
          ← Giriş Ekranına Dön
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
