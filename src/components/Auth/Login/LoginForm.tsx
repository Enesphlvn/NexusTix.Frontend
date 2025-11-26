import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";

interface LoginFormProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  error: string | null;
  loading: boolean;
}

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  error,
  loading,
}: LoginFormProps) => {
  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h1>Giriş Yap</h1>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.formGroup}>
          <label htmlFor="email">E-posta</label>
          <input
            type="email"
            id="email"
            className={styles.formInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Şifre</label>
          <input
            type="password"
            id="password"
            className={styles.formInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>

        <div className={styles.switchLink}>
          Hesabınız yok mu? <Link to="/register">Kayıt Ol</Link>
        </div>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link to="/forgot-password" className={styles.forgotPasswordLink}>
            Şifrenizi mi unuttunuz?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
