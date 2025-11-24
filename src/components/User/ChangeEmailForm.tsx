import { useState } from "react";
import { useAuth } from "../../hooks/Auth/useAuth";
import { updateEmail } from "../../api/Auth/authService";
import { toast } from "react-toastify";
import styles from "./FormStyles.module.css";
import { useNavigate } from "react-router-dom";

interface ChangeEmailFormProps {
  userId: number;
  currentEmail: string;
}

const ChangeEmailForm = ({ userId, currentEmail }: ChangeEmailFormProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState(currentEmail);
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newEmail === currentEmail) {
      toast.info("Yeni e-posta adresi eskisiyle aynı.");
      return;
    }

    try {
      await updateEmail({ id: userId, newEmail, currentPassword: password });
      toast.success(
        "E-posta başarıyla değiştirildi. Güvenlik gereği çıkış yapılıyor...",
        {
          position: "top-center",
          autoClose: 2000,
        }
      );
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>E-posta Değiştir</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Yeni E-posta Adresi</label>
          <input
            type="email"
            className={styles.input}
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Onay için Mevcut Şifreniz</label>
          <input
            type="password"
            className={styles.input}
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          E-postayı Güncelle
        </button>
      </form>
    </div>
  );
};
export default ChangeEmailForm;
