import { Link } from "react-router-dom";
import type { ArtistResponse } from "../../../models/Artist/Responses/ArtistResponse";
import styles from "./AdminArtistRow.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";

interface AdminArtistRowProps {
  artist: ArtistResponse;
  onDelete: (id: number) => void;
}

const AdminArtistRow = ({ artist, onDelete }: AdminArtistRowProps) => {
  return (
    <tr className={styles.row}>
      <td className={`${styles.cell} ${styles.idCell}`}>#{artist.id}</td>

      <td className={styles.cell}>
        <div className={styles.artistInfo}>
          <img
            src={artist.imageUrl || "/images/default-placeholder.jpg"}
            alt={artist.name}
            className={styles.avatar}
            onError={(e) =>
              (e.currentTarget.src = "/images/default-placeholder.jpg")
            }
          />
          <span className={styles.name}>{artist.name}</span>
        </div>
      </td>

      <td className={`${styles.cell} ${styles.bioCell}`}>
        {artist.bio || "-"}
      </td>

      <td className={styles.actionsCell}>
        <div className={styles.actionsWrapper}>
          <Link
            to={`/admin/artists/edit/${artist.id}`}
            className={styles.editButton}
          >
            <FaEdit /> Düzenle
          </Link>

          <button
            onClick={() => onDelete(artist.id)}
            className={styles.deleteButton}
          >
            <FaTrash /> Kaldır
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminArtistRow;
