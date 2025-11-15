import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";
import ErrorMessage from "../../../components/Common/ErrorMessage";
import { useAdminVenues } from "../../../hooks/Venue/useAdminVenues";
import { usePassiveVenue } from "../../../hooks/Venue/usePassiveVenue";
import AdminVenueRow from "../../../components/Admin/Venue/AdminVenueRow";

const AdminVenuesPage = () => {
  const { venues, loading, error, refetch } = useAdminVenues();
  const { handlePassive } = usePassiveVenue(refetch);

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
        <h2 style={{ margin: 0, color: "#333" }}>Mekan Yönetimi</h2>
        <Link
          to="/admin/venues/new"
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
          <span>+</span> Yeni Mekan Ekle
        </Link>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "600px",
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
              <th style={{ padding: "1rem", color: "#495057" }}>Mekan Adı</th>
              <th style={{ padding: "1rem", color: "#495057" }}>Bilgiler</th>
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
            {venues.map((venue) => (
              <AdminVenueRow
                key={venue.id}
                venue={venue}
                onDelete={handlePassive}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVenuesPage;
