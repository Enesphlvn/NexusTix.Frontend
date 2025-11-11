import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../api/Auth/authService";
import styles from "../Auth/RegisterPage.module.css";
import type { CreateUserRequest } from "../../models/Auth/Requests/CreateUserRequest";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName || !lastName || !email || !password) {
      setError("Tüm zorunlu alanlar doldurulmalıdır.");
      return;
    }

    try {
      const request: CreateUserRequest = {
        firstName,
        lastName,
        email,
        password,
        phoneNumber: phoneNumber || null,
      };

      await authService.register(request);

      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Kayıt işlemi başarısız.");
    }
  };

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

        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber">Telefon (Opsiyonel)</label>
          <input
            type="tel"
            id="phoneNumber"
            className={styles.formInput}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Kayıt Ol
        </button>

        <div className={styles.switchLink}>
          Zaten hesabınız var mı? <Link to="/login">Giriş Yap</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
