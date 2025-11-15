import { Link } from "react-router-dom";
import type { VenueResponse } from "../../../models/Venue/Responses/VenueResponse";
import styles from "./AdminVenueRow.module.css";

interface AdminVenueRowProps {
  venue: VenueResponse;
  onDelete: (id: number) => void;
}

const AdminVenueRow = ({ venue, onDelete }: AdminVenueRowProps) => {
  return (
    <tr className={styles.row}>
      <td className={`${styles.cell} ${styles.idCell}`}>#{venue.id}</td>

      <td className={`${styles.cell} ${styles.nameCell}`}>{venue.name}</td>

      <td className={`${styles.cell} ${styles.capacityCell}`}>
        Kapasite: {venue.capacity}
      </td>

      <td className={styles.actionsCell}>
        <div className={styles.actionsWrapper}>
          <Link
            to={`/admin/venues/edit/${venue.id}`}
            className={styles.editButton}
          >
            Düzenle
          </Link>

          <button
            onClick={() => onDelete(venue.id)}
            className={styles.deleteButton}
          >
            Sil
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminVenueRow;
