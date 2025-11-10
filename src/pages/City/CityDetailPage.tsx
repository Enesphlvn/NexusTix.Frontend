import { useParams } from "react-router-dom";
import { useCity } from "../../hooks/City/useCity";
import CityDetail from "../../components/City/CityDetail";

const CityDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { city, loading, error } = useCity(Number(id));

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Hata: {error}</div>;
  }

  if (!city) {
    return <div>Şehir bulunamadı.</div>;
  }

  return <CityDetail city={city} />;
};

export default CityDetailPage;
