import { useEffect, useState } from "react";
import type { Event } from "../../models/Event/Event";
import { getAllEvents } from "../../api/Event/eventService";

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllEvents();
        setEvents(data);
      } catch (err: any) {
        setError(err.message || "Etkinlikler yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return { events, loading, error };
};