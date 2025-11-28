import AdminArtistForm from "../../../components/Admin/Artist/AdminArtistForm";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";
import { useArtistForm } from "../../../hooks/Artist/useArtistForm";

const AdminArtistFormPage = () => {
  const formLogic = useArtistForm();

  if (formLogic.initialLoading) return <LoadingSpinner />;

  return <AdminArtistForm {...formLogic} />;
};

export default AdminArtistFormPage;
