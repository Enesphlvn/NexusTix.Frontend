import { FaKey } from "react-icons/fa";
import styles from "./ResetPasswordForm.module.css";

interface ResetPasswordFormProps {
  newPassword: string;
  setNewPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  loading: boolean;
  error: string | null;
  handleSubmit: (e: React.FormEvent) => void;
}

const ResetPasswordForm = ({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  loading,
  error,
  handleSubmit,
}: ResetPasswordFormProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
            color: "#28a745",
            fontSize: "2rem",
          }}
        >
          <FaKey />
        </div>
        <h1 className={styles.title}>Yeni Şifre Belirle</h1>
        <p className={styles.description}>
          Lütfen hesabınız için yeni ve güçlü bir şifre belirleyiniz.
        </p>

        <form onSubmit={handleSubmit}>
          {error && <div className={styles.errorMessage}>{error}</div>}
          <div className={styles.formGroup}>
            <label>Yeni Şifre</label>
            <input
              type="password"
              className={styles.input}
              placeholder="********"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Yeni Şifre (Tekrar)</label>
            <input
              type="password"
              className={styles.input}
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Sıfırlanıyor..." : "Şifreyi Güncelle"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
