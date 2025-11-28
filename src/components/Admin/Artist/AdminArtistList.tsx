import type { ArtistResponse } from "../../../models/Artist/Responses/ArtistResponse";
import AdminArtistRow from "./AdminArtistRow";
import styles from "./AdminArtistList.module.css";

interface AdminArtistListProps {
  artists: ArtistResponse[];
  onDelete: (id: number) => void;
}

const AdminArtistList = ({ artists, onDelete }: AdminArtistListProps) => {
  if (artists.length === 0) {
    return (
      <div className={styles.emptyState}>Henüz hiç sanatçı eklenmemiş.</div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>ID</th>
            <th className={styles.headerCell}>Sanatçı</th>
            <th className={styles.headerCell}>Biyografi</th>
            <th className={styles.headerActions}>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist) => (
            <AdminArtistRow
              key={artist.id}
              artist={artist}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminArtistList;
