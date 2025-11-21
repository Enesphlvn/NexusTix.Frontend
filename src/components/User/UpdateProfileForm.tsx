import { useEffect, useState } from "react";
import type { UserResponse } from "../../models/User/Responses/UserResponse";
import { updateProfile } from "../../api/User/userService";
import { toast } from "react-toastify";
import styles from "./FormStyles.module.css";

interface UpdateProfileFormProps {
  user: UserResponse;
  onUpdateSuccess: () => void;
}

const UpdateProfileForm = ({
  user,
  onUpdateSuccess,
}: UpdateProfileFormProps) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPhoneNumber(user.phoneNumber || "");
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        id: user.id,
        firstName,
        lastName,
        phoneNumber: phoneNumber || null,
      });

      toast.success("Profil bilgileriniz güncellendi! ✅", {
        position: "top-right",
      });
      onUpdateSuccess();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Bilgilerimi Güncelle</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Ad</label>
            <input
              type="text"
              className={styles.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Soyad</label>
            <input
              type="text"
              className={styles.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Telefon</label>
          <input
            type="tel"
            className={styles.input}
            placeholder="05xxxxxxxxx"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.button}>
          Kaydet
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
