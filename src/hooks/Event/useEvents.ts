import { useCallback, useEffect, useState } from "react";
import type { EventResponse } from "../../models/Event/Responses/EventResponse";
import { getFilteredEvents } from "../../api/Event/eventService";
import type { EventFiltersRequest } from "../../models/Event/Requests/EventFiltersRequest";

export const useEvents = (filters: EventFiltersRequest) => {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getFilteredEvents(filters);

      setEvents(data);
    } catch (err: any) {
      setError(err.message || "Etkinlikler yüklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  }, [filters.cityId, filters.eventTypeId, filters.date, filters.districtId]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, refetch: fetchEvents };
};
