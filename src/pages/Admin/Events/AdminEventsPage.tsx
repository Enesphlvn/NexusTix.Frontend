import LoadingSpinner from "../../../components/Common/LoadingSpinner";
import { Link } from "react-router-dom";
import { useAdminEvents } from "../../../hooks/Event/useAdminEvents";
import { usePassiveEvent } from "../../../hooks/Event/usePassiveEvent";
import ErrorMessage from "../../../components/Common/ErrorMessage";
import AdminEventList from "../../../components/Admin/Event/AdminEventList";
import styles from '../Common/AdminEntitiesPage.module.css';

const AdminEventsPage = () => {
  const { events, loading, error, refetch } = useAdminEvents();
  const { handlePassive } = usePassiveEvent(refetch);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Etkinlik Yönetimi</h2>
        
        <Link to="/admin/events/new" className={styles.addButton}>
          <span>+</span> Yeni Etkinlik Ekle
        </Link>
      </div>

      <AdminEventList events={events} onDelete={handlePassive} />
    </div>
  );
};

export default AdminEventsPage;