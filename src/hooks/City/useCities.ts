import { useEffect, useState } from "react";
import type { CityResponse } from "../../models/City/Responses/CityResponse";
import { getAllCities } from "../../api/City/cityService";

export const useCities = () => {
  const [cities, setCities] = useState<CityResponse[]>([]);
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

  return { cities, loading, error };
};
