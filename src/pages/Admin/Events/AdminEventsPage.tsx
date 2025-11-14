import Swal from "sweetalert2";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";
import { Link } from "react-router-dom";
import { deleteEvent } from "../../../api/Event/eventService";
import { useAdminEvents } from "../../../hooks/Event/useAdminEvents";

const AdminEventsPage = () => {
  const { events, loading, error, refetch } = useAdminEvents();

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Emin misiniz?",
      text: "Bu etkinlik kalıcı olarak silinecektir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Evet, Sil!",
      cancelButtonText: "Vazgeç",
    });

    if (result.isConfirmed) {
      try {
        await deleteEvent(id);
        toast.success("Etkinlik başarıyla silindi.");
        if (refetch) refetch();
        else window.location.reload();
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

//   const handlePassive = async (id: number) => {
//      toast.info("Pasife alma özelliği yakında eklenecek.");
//   };

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div style={{ color: "red", padding: "2rem" }}>Hata: {error}</div>;

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
              <tr
                key={event.id}
                style={{
                  borderBottom: "1px solid #eee",
                  transition: "background-color 0.2s",
                }}
              >
                <td
                  style={{
                    padding: "1rem",
                    fontWeight: "bold",
                    color: "#6c757d",
                  }}
                >
                  #{event.id}
                </td>

                <td
                  style={{
                    padding: "1rem",
                    fontWeight: "600",
                    color: "#212529",
                  }}
                >
                  {event.name}
                </td>

                <td style={{ padding: "1rem", color: "#495057" }}>
                  {new Date(event.date).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>

                <td style={{ padding: "1rem" }}>
                  <div style={{ fontWeight: "600", color: "#343a40" }}>
                    {event.venueName}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#868e96" }}>
                    {event.eventTypeName}
                  </div>
                </td>

                <td
                  style={{
                    padding: "1rem",
                    fontWeight: "bold",
                    color: "#28a745",
                  }}
                >
                  {event.price} ₺
                </td>

                <td style={{ padding: "1rem", textAlign: "right" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      justifyContent: "flex-end",
                    }}
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
                      onClick={() => handleDelete(event.id)}
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
