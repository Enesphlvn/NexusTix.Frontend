import { useParams } from "react-router-dom";
import { useCity } from "../../hooks/City/useCity";
import CityDetail from "../../components/City/CityDetail";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import ErrorMessage from "../../components/Common/ErrorMessage";
import NotFoundPage from "../NotFound/NotFoundPage";

const CityDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { city, loading, error } = useCity(Number(id));

  if (loading) return <LoadingSpinner />;

  if (error) return <ErrorMessage message={error} />;

  if (!city) {
    return <NotFoundPage />;
  }

  return <CityDetail city={city} />;
};

export default CityDetailPage;
