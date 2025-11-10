import { useEffect, useState } from "react";
import type { City } from "../../models/City/City";
import { getCity } from "../../api/City/cityService";

export const useCity = (id: number | undefined) => {
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Geçerli bir Şehir ID'si sağlanmadı.");
      setLoading(false);
      return;
    }

    const fetchCity = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getCity(id);

        setCity(data);
      } catch (err: any) {
        setError(err.message || "Şehir verisi yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchCity();
  }, [id]);

  return { city, loading, error };
};
