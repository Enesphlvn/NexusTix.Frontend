import type { UserAdminResponse } from "../../../models/User/Responses/UserAdminResponse";
import AdminUserRow from "./AdminUserRow";
import styles from "../Common/AdminList.module.css";

interface AdminUserListProps {
  users: UserAdminResponse[];
  onRoleChange: (id: number, newRole: string) => void;
  onPassive: (id: number) => void;
}

const AdminUserList = ({
  users,
  onRoleChange,
  onPassive,
}: AdminUserListProps) => {
  if (users.length === 0) {
    return (
      <div className={styles.emptyState}>
        Sistemde kayıtlı kullanıcı bulunamadı.
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>ID</th>
            <th className={styles.headerCell}>Ad Soyad</th>
            <th className={styles.headerCell}>E-posta</th>
            <th className={styles.headerCell}>Rol</th>
            <th className={styles.headerCell}>Durum</th>
            <th className={styles.headerCell}>Kayıt Tarihi</th>
            <th className={styles.headerActions}>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <AdminUserRow
              key={user.id}
              user={user}
              onRoleChange={onRoleChange}
              onPassive={onPassive}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;
