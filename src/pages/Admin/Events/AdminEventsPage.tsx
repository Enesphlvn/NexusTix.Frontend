import LoadingSpinner from "../../../components/Common/LoadingSpinner";
import { Link } from "react-router-dom";
import { useAdminEvents } from "../../../hooks/Event/useAdminEvents";
import { useDeleteEvent } from "../../../hooks/Event/useDeleteEvent";
import AdminEventRow from "../../../components/Admin/Event/AdminEventRow";
import ErrorMessage from "../../../components/Common/ErrorMessage";

const AdminEventsPage = () => {
  const { events, loading, error, refetch } = useAdminEvents();

  const { handleDelete } = useDeleteEvent(refetch);

  if (loading) return <LoadingSpinner />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <div
      style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ margin: 0, color: "#333" }}>Etkinlik Yönetimi</h2>
        <Link
          to="/admin/events/new"
          style={{
            padding: "0.8rem 1.5rem",
            background: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span>+</span> Yeni Etkinlik Ekle
        </Link>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "800px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f8f9fa",
                textAlign: "left",
                borderBottom: "2px solid #e9ecef",
              }}
            >
              <th style={{ padding: "1rem", color: "#495057" }}>ID</th>
              <th style={{ padding: "1rem", color: "#495057" }}>Etkinlik</th>
              <th style={{ padding: "1rem", color: "#495057" }}>Tarih</th>
              <th style={{ padding: "1rem", color: "#495057" }}>
                Mekan / Kategori
              </th>
              <th style={{ padding: "1rem", color: "#495057" }}>Fiyat</th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "right",
                  color: "#495057",
                }}
              >
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <AdminEventRow
                key={event.id}
                event={event}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>

        {events.length === 0 && (
          <div
            style={{ textAlign: "center", padding: "3rem", color: "#6c757d" }}
          >
            Henüz hiç etkinlik eklenmemiş.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEventsPage;
