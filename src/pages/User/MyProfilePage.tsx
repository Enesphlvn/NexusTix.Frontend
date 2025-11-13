import ChangeEmailForm from "../../components/User/ChangeEmailForm";
import ChangePasswordForm from "../../components/User/ChangePasswordForm";
import UserProfileInfo from "../../components/User/UserProfileInfo";
import { useMyProfile } from "../../hooks/User/useMyProfile";
import styles from './MyProfilePage.module.css';

const MyProfilePage = () => {
  const { user, loading, error } = useMyProfile();

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div style={{ color: "red" }}>Hata: {error}</div>;
  if (!user) return <div>Kullanıcı bulunamadı.</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Profilim</h1>

      <UserProfileInfo user={user} />

      <ChangeEmailForm userId={user.id} currentEmail={user.email} />

      <ChangePasswordForm userId={user.id} />
    </div>
  );
};

export default MyProfilePage;
