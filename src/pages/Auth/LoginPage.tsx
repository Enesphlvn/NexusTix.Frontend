import { useState, type FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import type { LoginRequest } from "../../models/Auth/Requests/LoginRequest";
import styles from "../Auth/LoginPage.module.css";

const LoginPage = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("E-posta ve şifre alanları zorunludur.");
      return;
    }

    try {
      const request: LoginRequest = { email, password };

      await login(request);

      navigate("/");
    } catch (err: any) {
      setError(err.message || "Giriş işlemi başarısız.");
    }
  };

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
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Giriş Yap
        </button>

        <div className={styles.switchLink}>
          Hesabınız yok mu? <Link to="/register">Kayıt Ol</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
