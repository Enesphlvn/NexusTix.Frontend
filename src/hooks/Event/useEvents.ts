import { useEffect, useState } from "react";
import type { EventResponse } from "../../models/Event/Responses/EventResponse";
import { getFilteredEvents } from "../../api/Event/eventService";
import type { EventFiltersResponse } from "../../models/Event/Responses/EventFiltersResponse";

export const useEvents = (filters: EventFiltersResponse) => {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
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
    };
    fetchEvents();
  }, [filters.cityId, filters.eventTypeId, filters.date]);

  return { events, loading, error };
};
