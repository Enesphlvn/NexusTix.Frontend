import { useCallback, useEffect, useState } from "react";
import type { VenueResponse } from "../../models/Venue/Responses/VenueResponse";
import { getAllVenues } from "../../api/Venue/venueService";

export const useAdminVenues = () => {
  const [venues, setVenues] = useState<VenueResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVenues = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getAllVenues();

      setVenues(data);
    } catch (err: any) {
      setError(err.message || "Mekanlar yüklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  return { venues, loading, error, refetch: fetchVenues };
};
