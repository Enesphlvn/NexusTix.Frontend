import { useState } from "react";
import { useAuth } from "../../hooks/Auth/useAuth";
import { toast } from "react-toastify";
import { updatePassword } from "../../api/Auth/authService";
import styles from "./FormStyles.module.css";
import { useNavigate } from "react-router-dom";

interface ChangePasswordFormProps {
  userId: number;
}

const ChangePasswordForm = ({ userId }: ChangePasswordFormProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.warning("Yeni şifreler birbiriyle uyuşmuyor!", {
        position: "top-right",
      });
      return;
    }

    try {
      await updatePassword({
        id: userId,
        currentPassword: currentPassword,
        newPassword: newPassword,
        newPasswordConfirm: confirmPassword,
      });

      toast.success(
        "Şifreniz başarıyla değiştirildi. Güvenlik gereği çıkış yapılıyor...",
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
      toast.error(error.message, { position: "top-right" });
    }
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Şifre Değiştir</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Mevcut Şifre</label>
          <input
            type="password"
            className={styles.input}
            placeholder="********"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Yeni Şifre</label>
          <input
            type="password"
            className={styles.input}
            placeholder="En az 6 karakter, 1 büyük, 1 rakam..."
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
            placeholder="Yeni şifreyi doğrulayın"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Şifreyi Değiştir
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
