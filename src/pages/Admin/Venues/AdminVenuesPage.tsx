import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";
import ErrorMessage from "../../../components/Common/ErrorMessage";
import { useAdminVenues } from "../../../hooks/Venue/useAdminVenues";
import { usePassiveVenue } from "../../../hooks/Venue/usePassiveVenue";
import AdminVenueList from "../../../components/Admin/Venue/AdminVenueList";
import styles from "../Events/AdminEventsPage.module.css";

const AdminVenuesPage = () => {
  const { venues, loading, error, refetch } = useAdminVenues();
  const { handlePassive } = usePassiveVenue(refetch);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Mekan Yönetimi</h2>

        <Link to="/admin/venues/new" className={styles.addButton}>
          <span>+</span> Yeni Mekan Ekle
        </Link>
      </div>

      <AdminVenueList venues={venues} onDelete={handlePassive} />
    </div>
  );
};

export default AdminVenuesPage;
