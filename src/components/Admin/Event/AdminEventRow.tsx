import { Link } from "react-router-dom";
import type { EventAdminResponse } from "../../../models/Event/Responses/EventAdminResponse";
import styles from "./AdminEventRow.module.css";
import { FaEdit, FaMicrophoneAlt } from "react-icons/fa";

interface AdminEventRowProps {
  event: EventAdminResponse;
  onDelete: (id: number, isActive: boolean) => void;
}

const AdminEventRow = ({ event, onDelete }: AdminEventRowProps) => {
  const eventDateFormatted = new Date(event.date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const createdDateFormatted = new Date(event.created).toLocaleDateString(
    "tr-TR",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const updatedDateFormatted = event.updated
    ? new Date(event.updated).toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const tooltipText = event.updated
    ? `Son Güncelleme: ${updatedDateFormatted}`
    : "Henüz güncellenmedi";

  return (
    <tr className={styles.row}>
      <td className={`${styles.cell} ${styles.idCell}`}>#{event.id}</td>

      <td className={styles.cell}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span className={styles.nameCell}>{event.name}</span>

          {event.artistNames && event.artistNames.length > 0 ? (
            <span
              style={{
                fontSize: "0.85rem",
                color: "#7e8299",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <FaMicrophoneAlt size={12} color="#009ef7" />
              {event.artistNames.join(", ")}
            </span>
          ) : (
            <span style={{ fontSize: "0.85rem", color: "#b5b5c3" }}>-</span>
          )}
        </div>
      </td>

      <td className={styles.cell}>{eventDateFormatted}</td>

      <td className={styles.cell}>
        <div className={styles.venueCategoryCell}>{event.venueName}</div>
        <div className={styles.eventTypeSubText}>{event.eventTypeName}</div>
      </td>
 
      <td className={`${styles.cell} ${styles.priceCell}`}>{event.price} ₺</td>

      <td className={styles.cell}>
        <span
          className={`${styles.badge} ${
            event.isActive ? styles.activeBadge : styles.passiveBadge
          }`}
        >
          {event.isActive ? "Aktif" : "Pasif"}
        </span>
      </td>

      <td
        className={styles.cell}
        title={tooltipText}
        style={{ cursor: "help" }}
      >
        {createdDateFormatted}
        {event.updated && (
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
            to={`/admin/events/edit/${event.id}`}
            className={styles.editButton}
          >
            <FaEdit /> Düzenle
          </Link>

          <button
            onClick={() => onDelete(event.id, event.isActive)}
            className={
              event.isActive ? styles.deleteButton : styles.activateButton
            }
          >
            {event.isActive ? "Pasife Al" : "Aktife Al"}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminEventRow;
