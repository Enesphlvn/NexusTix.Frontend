import { useEffect, useState } from "react";
import type { Event } from "../../models/Event/Responses/Event";
import { getAllEvents, getFilteredEvents } from "../../api/Event/eventService";
import type { EventFilters } from "../../models/Event/Responses/EventFilters";

export const useEvents = (filters: EventFilters) => {
  const [events, setEvents] = useState<Event[]>([]);
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
