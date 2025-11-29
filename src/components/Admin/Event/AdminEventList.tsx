import type { EventAdminResponse } from "../../../models/Event/Responses/EventAdminResponse";
import AdminEventRow from "./AdminEventRow";
import styles from "./AdminEventList.module.css";

interface AdminEventListProps {
  events: EventAdminResponse[];
  onDelete: (id: number, isActive: boolean) => void;
}
 
const AdminEventList = ({ events, onDelete }: AdminEventListProps) => {
  if (events.length === 0) {
    return (
      <div className={styles.emptyState}>Henüz hiç etkinlik eklenmemiş.</div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>ID</th>
            <th className={styles.headerCell}>Etkinlik & Sanatçı</th>
            <th className={styles.headerCell}>Tarih</th>
            <th className={styles.headerCell}>Mekan / Kategori</th>
            <th className={styles.headerCell}>Fiyat</th>
            <th className={styles.headerCell}>Durum</th>
            <th className={styles.headerCell}>Kayıt Tarihi</th>
            <th className={styles.headerActions}>İşlemler</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <AdminEventRow key={event.id} event={event} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminEventList;
