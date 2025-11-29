import { Link } from "react-router-dom";
import ErrorMessage from "../../../components/Common/ErrorMessage";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";
import { useAdminArtists } from "../../../hooks/Artist/useAdminArtists";
import AdminArtistList from "../../../components/Admin/Artist/AdminArtistList";
import styles from "../Common/AdminEntitiesPage.module.css";
 
const AdminArtistsPage = () => {
  const { artists, loading, error, handlePassive } = useAdminArtists();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Sanatçı Yönetimi</h2>
        <Link to="/admin/artists/new" className={styles.addButton}>
          <span>+</span> Yeni Sanatçı Ekle
        </Link>
      </div>
 
      <AdminArtistList artists={artists} onDelete={handlePassive} />
    </div>
  );
};

export default AdminArtistsPage;
