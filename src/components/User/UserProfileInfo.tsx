import type { UserResponse } from "../../models/User/Responses/UserResponse";
import styles from "./UserProfileInfo.module.css";

interface UserProfileInfoProps {
  user: UserResponse;
}

const UserProfileInfo = ({ user }: UserProfileInfoProps) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Kişisel Bilgiler</h2>
      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <label>Ad Soyad</label>
          <p>
            {user.firstName} {user.lastName}
          </p>
        </div>
        <div className={styles.infoItem}>
          <label>E-posta</label>
          <p>{user.email}</p>
        </div>
        <div className={styles.infoItem}>
          <label>Telefon</label>
          <p>{user.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};
export default UserProfileInfo;
