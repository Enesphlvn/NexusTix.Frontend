import { Link } from "react-router-dom";
import styles from "./RegisterForm.module.css";

interface RegisterFormProps {
  firstName: string;
  setFirstName: (val: string) => void;
  lastName: string;
  setLastName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  error: string | null;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

const RegisterForm = (props: RegisterFormProps) => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    error,
    loading,
    handleSubmit,
  } = props;

  return (
    <div className={styles.registerContainer}>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <h1>Kayıt Ol</h1>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.formGroup}>
          <label htmlFor="firstName">Ad</label>
          <input
            type="text"
            id="firstName"
            className={styles.formInput}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName">Soyad</label>
          <input
            type="text"
            id="lastName"
            className={styles.formInput}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={loading}
          />
        </div>

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

        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber">Telefon (Opsiyonel)</label>
          <input
            type="tel"
            id="phoneNumber"
            className={styles.formInput}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Kaydediliyor..." : "Kayıt Ol"}
        </button>

        <div className={styles.switchLink}>
          Zaten hesabınız var mı? <Link to="/login">Giriş Yap</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
