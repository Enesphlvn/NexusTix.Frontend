import type { UserResponse } from "../../models/User/Responses/UserResponse";
import styles from "./UserProfileInfo.module.css";

interface UserProfileInfoProps {
  user: UserResponse;
}

const UserProfileInfo = ({ user }: UserProfileInfoProps) => {
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  const joinDate = new Date(user.created).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>{initials}</div>
        <div className={styles.nameSection}>
          <h2 className={styles.fullName}>
            {user.firstName} {user.lastName}
          </h2>
        </div>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <label className={styles.label}>E-posta Adresi</label>
          <p className={`${styles.value} ${styles.valueEmail}`}>{user.email}</p>
        </div>

        <div className={styles.infoItem}>
          <label className={styles.label}>Telefon Numarası</label>
          <p className={styles.value}>{user.phoneNumber || "Tanımlanmamış"}</p>
        </div>

        <div className={styles.infoItem}>
          <label className={styles.label}>Katılım Tarihi</label>
          <p className={styles.value}>{joinDate}</p>
        </div>
      </div>
    </div>
  );
};
export default UserProfileInfo;
