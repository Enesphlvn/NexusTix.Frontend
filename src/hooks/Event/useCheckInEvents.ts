import { useEffect, useState } from "react";
import type { EventListResponse } from "../../models/Event/Responses/EventListResponse";
import { getEventsForCheckIn } from "../../api/Event/eventService";
import { toast } from "react-toastify";

export const useCheckInEvents = () => {
  const [events, setEvents] = useState<EventListResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEventsForCheckIn();

        setEvents(data);
      } catch (error) {
        toast.error("Etkinlik listesi yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return { events, loading };
};
