import { useCities } from "../../hooks/City/useCities";
import CityList from "../../components/City/CityList";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import ErrorMessage from "../../components/Common/ErrorMessage";

const CitiesPage = () => {
  const { cities, loading, error } = useCities();

  if (loading) return <LoadingSpinner />;

  if (error) return <ErrorMessage message={error} />;

  return <CityList cities={cities} />;
};

export default CitiesPage;
