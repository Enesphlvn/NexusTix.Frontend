import { useEffect, useState } from "react";
import type { City } from "../../models/City/City";
import { useParams } from "react-router-dom";
import { getCity } from "../../api/City/cityService";

const CityDetailPage = () => {
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) {
      setError("Şehir ID'si bulunamadı.");
      setLoading(false);
      return;
    }

    const fetchCity = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getCity(Number(id));
        setCity(data);
      } catch (err: any) {
        setError(err.message || "Şehir verisi yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchCity();
  }, [id]);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Hata: {error}</div>;
  }

  if (!city) {
    return <div>Şehir bulunamadı.</div>;
  }

  return (
    <div>
      <h1>Şehir Detayı</h1>
      <h2>
        {city.name} (ID: {city.id})
      </h2>
    </div>
  );
};

export default CityDetailPage;
