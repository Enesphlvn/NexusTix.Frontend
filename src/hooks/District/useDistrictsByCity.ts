import { useEffect, useState } from "react";
import type { DistrictResponse } from "../../models/District/DistrictResponse";
import { getDistrictsByCity } from "../../api/District/districtService";

export const useDistrictsByCity = (cityId: number | undefined) => {
  const [districts, setDistricts] = useState<DistrictResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!cityId) {
      setDistricts([]);
      return;
    }

    const fetchDistricts = async () => {
      try {
        setLoading(true);

        const data = await getDistrictsByCity(cityId);

        setDistricts(data);
      } catch (err) {
        console.error("İlçeler yüklenemedi", err);
        setDistricts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDistricts();
  }, [cityId]);

  return { districts, loading };
};
