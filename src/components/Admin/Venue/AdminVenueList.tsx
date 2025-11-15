import type { VenueResponse } from "../../../models/Venue/Responses/VenueResponse";
import AdminVenueRow from "./AdminVenueRow";
import styles from "../Event/AdminEventList.module.css";

interface AdminVenueListProps {
  venues: VenueResponse[];
  onDelete: (id: number) => void;
}

const AdminVenueList = ({ venues, onDelete }: AdminVenueListProps) => {
  if (venues.length === 0) {
    return <div className={styles.emptyState}>Henüz hiç mekan eklenmemiş.</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>ID</th>
            <th className={styles.headerCell}>Mekan Adı</th>
            <th className={styles.headerCell}>Bilgiler</th>
            <th className={styles.headerActions}>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <AdminVenueRow key={venue.id} venue={venue} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminVenueList;
