import { Link } from "react-router-dom";
import type { EventAdminResponse } from "../../../models/Event/Responses/EventAdminResponse";

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
    <tr
      style={{
        borderBottom: "1px solid #eee",
        transition: "background-color 0.2s",
      }}
    >
      <td style={{ padding: "1rem", fontWeight: "bold", color: "#6c757d" }}>
        #{event.id}
      </td>

      <td style={{ padding: "1rem", fontWeight: "600", color: "#212529" }}>
        {event.name}
      </td>

      <td style={{ padding: "1rem", color: "#495057" }}>{formattedDate}</td>

      <td style={{ padding: "1rem" }}>
        <div style={{ fontWeight: "600", color: "#343a40" }}>
          {event.venueName}
        </div>
        <div style={{ fontSize: "0.85rem", color: "#868e96" }}>
          {event.eventTypeName}
        </div>
      </td>

      <td style={{ padding: "1rem", fontWeight: "bold", color: "#28a745" }}>
        {event.price} ₺
      </td>

      <td style={{ padding: "1rem", textAlign: "right" }}>
        <div
          style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}
        >
          <Link
            to={`/admin/events/edit/${event.id}`}
            style={{
              padding: "0.5rem 1rem",
              background: "#ffc107",
              color: "#212529",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "0.9rem",
              fontWeight: "500",
            }}
          >
            Düzenle
          </Link>

          <button
            onClick={() => onDelete(event.id)}
            style={{
              padding: "0.5rem 1rem",
              background: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "500",
            }}
          >
            Sil
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminEventRow;
