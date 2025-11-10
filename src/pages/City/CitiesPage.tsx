import { useCities } from "../../hooks/City/useCities";
import CityList from "../../components/City/CityList";

const CitiesPage = () => {
  const { cities, loading, error } = useCities();

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Hata: {error}</div>;
  }

  return (
    <div>
      <h1>Şehirler</h1>
      <CityList cities={cities} />
    </div>
  );
};

export default CitiesPage;
