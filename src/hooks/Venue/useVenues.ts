import { useEffect, useState } from "react";
import type { VenueResponse } from "../../models/Venue/Responses/VenueResponse";
import { getAllVenues } from "../../api/Venue/venueService";

export const useVenues = () => {
  const [venues, setVenues] = useState<VenueResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);

        const data = await getAllVenues();

        setVenues(data);
      } catch (err: any) {
        setError(err.message || "Mekanlar yüklenemedi");
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  return { venues, loading, error };
};
