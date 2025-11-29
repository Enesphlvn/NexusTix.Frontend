import { Link } from "react-router-dom";
import styles from "./AdminArtistRow.module.css";
import { FaEdit } from "react-icons/fa";
import type { ArtistAdminResponse } from "../../../models/Artist/Responses/ArtistAdminResponse";

interface AdminArtistRowProps {
  artist: ArtistAdminResponse;
  onDelete: (id: number, isActive: boolean) => void;
}
 
const AdminArtistRow = ({ artist, onDelete }: AdminArtistRowProps) => {
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

  const tooltipText = artist.updated
    ? `Son Güncelleme: ${formatDate(artist.updated)}`
    : "Henüz güncellenmedi";

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

      <td className={styles.cell}>
        <span
          className={`${styles.badge} ${
            artist.isActive ? styles.activeBadge : styles.passiveBadge
          }`}
        >
          {artist.isActive ? "Aktif" : "Pasif"}
        </span>
      </td>

      <td
        className={styles.cell}
        title={tooltipText}
        style={{ cursor: "help" }}
      >
        {formatDate(artist.created)}
        {artist.updated && (
          <span
            style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              backgroundColor: "#ffc107",
              borderRadius: "50%",
              marginLeft: "5px",
            }}
          />
        )}
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
            onClick={() => onDelete(artist.id, artist.isActive)}
            className={
              artist.isActive ? styles.deleteButton : styles.activateButton
            }
          >
            {artist.isActive ? "Pasife Al" : "Aktife Al"}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminArtistRow;
