import ErrorMessage from "../../components/Common/ErrorMessage";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import ChangeEmailForm from "../../components/User/ChangeEmailForm";
import ChangePasswordForm from "../../components/User/ChangePasswordForm";
import UpdateProfileForm from "../../components/User/UpdateProfileForm";
import UserProfileInfo from "../../components/User/UserProfileInfo";
import { useMyProfile } from "../../hooks/User/useMyProfile";
import styles from "./MyProfilePage.module.css";

const MyProfilePage = () => {
  const { user, loading, error, refetch } = useMyProfile();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  if (!user) return <ErrorMessage message="Kullanıcı bilgileri bulunamadı." />;

  const handleProfileUpdateSuccess = () => {
    refetch();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Profilim</h1>
      <UserProfileInfo user={user} />
      <UpdateProfileForm
        user={user}
        onUpdateSuccess={handleProfileUpdateSuccess}
      />
      <ChangeEmailForm userId={user.id} currentEmail={user.email} />
      <ChangePasswordForm userId={user.id} />
    </div>
  );
};

export default MyProfilePage;
