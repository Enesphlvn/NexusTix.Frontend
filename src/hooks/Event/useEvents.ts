import { useCallback, useEffect, useState } from "react";
import { getFilteredEvents } from "../../api/Event/eventService";
import type { EventFiltersRequest } from "../../models/Event/Requests/EventFiltersRequest";
import type { EventListResponse } from "../../models/Event/Responses/EventListResponse";

export const useEvents = (filters: EventFiltersRequest) => {
  const [events, setEvents] = useState<EventListResponse[]>([]);
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
