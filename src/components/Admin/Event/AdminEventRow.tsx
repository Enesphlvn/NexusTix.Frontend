import { Link } from "react-router-dom";
import type { EventAdminResponse } from "../../../models/Event/Responses/EventAdminResponse";
import styles from "./AdminEventRow.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";

interface AdminEventRowProps {
  event: EventAdminResponse;
  onDelete: (id: number) => void;
}

const AdminEventRow = ({ event, onDelete }: AdminEventRowProps) => {
  const formattedDate = new Date(event.date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <tr className={styles.row}>
      <td className={`${styles.cell} ${styles.idCell}`}>#{event.id}</td>

      <td
        className={`${styles.cell} ${styles.nameCell}`}
      >
        {event.artistNames && event.artistNames.length > 0
          ? event.artistNames.join(", ")
          : "-"}
      </td>
      <td className={`${styles.cell} ${styles.nameCell}`}>{event.name}</td>

      <td className={styles.cell}>{formattedDate}</td>

      <td className={styles.cell}>
        <div className={styles.venueCategoryCell}>{event.venueName}</div>
        <div className={styles.eventTypeSubText}>{event.eventTypeName}</div>
      </td>

      <td className={`${styles.cell} ${styles.priceCell}`}>{event.price} ₺</td>

      <td className={styles.actionsCell}>
        <div className={styles.actionsWrapper}>
          <Link
            to={`/admin/events/edit/${event.id}`}
            className={styles.editButton}
          >
            <FaEdit /> Düzenle
          </Link>

          <button
            onClick={() => onDelete(event.id)}
            className={styles.deleteButton}
          >
            <FaTrash /> Sil
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminEventRow;
