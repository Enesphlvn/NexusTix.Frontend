import AdminUserList from "../../../components/Admin/User/AdminUserList";
import ErrorMessage from "../../../components/Common/ErrorMessage";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";
import { useAdminUsers } from "../../../hooks/User/useAdminUsers";
import styles from "../Common/AdminEntitiesPage.module.css";

const AdminUsersPage = () => {
  const { users, loading, error, handleRoleChange, handlePassive } =
    useAdminUsers();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Kullanıcı Yönetimi</h2>
        <div className={styles.addButton} style={{ visibility: "hidden" }}>
          Placeholder
        </div>
      </div>

      <AdminUserList
        users={users}
        onRoleChange={handleRoleChange}
        onPassive={handlePassive}
      />
    </div>
  );
};

export default AdminUsersPage;
