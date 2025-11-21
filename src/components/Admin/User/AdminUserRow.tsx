import type { UserAdminResponse } from "../../../models/User/Responses/UserAdminResponse";
import styles from "./AdminUserRow.module.css";

interface AdminUserRowProps {
  user: UserAdminResponse;
  onRoleChange: (id: number, newRole: string) => void;
  onPassive: (id: number, isActive: boolean) => void;
}

const AdminUserRow = ({ user, onRoleChange, onPassive }: AdminUserRowProps) => {
  const currentRole = user.roles.length > 0 ? user.roles[0] : "User";
  const createdDate = new Date(user.created).toLocaleDateString("tr-TR");

  return (
    <tr className={styles.row}>
      <td className={`${styles.cell} ${styles.idCell}`}>#{user.id}</td>
      <td className={`${styles.cell} ${styles.nameCell}`}>
        {user.firstName} {user.lastName}
      </td>
      <td className={`${styles.cell} ${styles.emailCell}`}>{user.email}</td>

      <td className={styles.cell}>
        <select
          className={styles.roleSelect}
          value={currentRole}
          onChange={(e) => onRoleChange(user.id, e.target.value)}
        >
          <option value="User">User</option>
          <option value="Manager">Manager</option>
          <option value="Admin">Admin</option>
        </select>
      </td>

      <td className={styles.cell}>
        <span
          className={`${styles.badge} ${
            user.isActive ? styles.activeBadge : styles.passiveBadge
          }`}
        >
          {user.isActive ? "Aktif" : "Pasif"}
        </span>
      </td>

      <td className={styles.cell}>{createdDate}</td>

      <td style={{ textAlign: "right", padding: "1rem" }}>
        <button
          className={
            user.isActive ? styles.deleteButton : styles.activateButton
          }
          onClick={() => onPassive(user.id, user.isActive)}
        >
          {user.isActive ? "Pasife Al" : "Aktife Al"}
        </button>
      </td>
    </tr>
  );
};

export default AdminUserRow;
