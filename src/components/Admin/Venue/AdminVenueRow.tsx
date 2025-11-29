import { Link } from "react-router-dom";
import styles from "./AdminVenueRow.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { VenueAdminResponse } from "../../../models/Venue/Responses/VenueAdminResponse";

interface AdminVenueRowProps {
  venue: VenueAdminResponse;
  onDelete: (id: number, isActive: boolean) => void;
}

const AdminVenueRow = ({ venue, onDelete }: AdminVenueRowProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const tooltipText = venue.updated
    ? `Son Güncelleme: ${formatDate(venue.updated)}`
    : "Henüz güncellenmedi";

  return (
    <tr className={styles.row}>
      <td className={`${styles.cell} ${styles.idCell}`}>#{venue.id}</td>

      <td className={`${styles.cell} ${styles.nameCell}`}>{venue.name}</td>

      <td className={`${styles.cell} ${styles.capacityCell}`}>
        Kapasite: {venue.capacity}
      </td>

      <td className={styles.cell}>
        <span
          className={`${styles.badge} ${
            venue.isActive ? styles.activeBadge : styles.passiveBadge
          }`}
        >
          {venue.isActive ? "Aktif" : "Pasif"}
        </span>
      </td>

      <td
        className={styles.cell}
        title={tooltipText}
        style={{ cursor: "help" }}
      >
        {formatDate(venue.created)}
        {venue.updated && (
          <span
            style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              backgroundColor: "#ffc107",
              borderRadius: "50%",
              marginLeft: "8px",
              marginBottom: "2px",
            }}
          />
        )}
      </td>

      <td className={styles.actionsCell}>
        <div className={styles.actionsWrapper}>
          <Link
            to={`/admin/venues/edit/${venue.id}`}
            className={styles.editButton}
          >
            <FaEdit /> Düzenle
          </Link>

          <button
            className={
              venue.isActive ? styles.deleteButton : styles.activateButton
            }
            onClick={() => onDelete(venue.id, venue.isActive)}
          >
            {venue.isActive ? "Pasife Al" : "Aktife Al"}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminVenueRow;
