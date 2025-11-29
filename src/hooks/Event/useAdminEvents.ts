import { useCallback, useEffect, useState } from "react";
import type { EventAdminResponse } from "../../models/Event/Responses/EventAdminResponse";
import { getAllEventsForAdmin } from "../../api/Event/eventService";
 
export const useAdminEvents = () => {
  const [events, setEvents] = useState<EventAdminResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllEventsForAdmin();
      setEvents(data);
    } catch (err: any) {
      setError(
        err.message || "Admin etkinlik listesi yüklenirken hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, refetch: fetchEvents };
};
