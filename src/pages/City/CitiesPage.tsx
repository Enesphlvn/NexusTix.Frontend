import { useCities } from "../../hooks/City/useCities";
import CityList from "../../components/City/CityList";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

const CitiesPage = () => {
  const { cities, loading, error } = useCities();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div style={{ color: "red" }}>Hata: {error}</div>;
  }

  return <CityList cities={cities} />;
};

export default CitiesPage;
