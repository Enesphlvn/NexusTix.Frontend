import { useEffect, useState } from "react";
import type { City } from "../../models/City/City";
import { getAllCities } from "../../api/City/cityService";

const CitiesPage = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getAllCities();

        setCities(data);
      } catch (err: any) {
        setError(err.message || "Bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Hata: {error}</div>;
  }

  return (
    <div>
      <h1>Şehirler</h1>
      <ul>
        {cities.map((city) => (
          <li key={city.id}>
            {city.name} (ID: {city.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitiesPage;