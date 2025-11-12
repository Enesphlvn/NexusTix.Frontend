import { useEffect, useState } from "react";
import type { EventTypeResponse } from "../../models/EventType/Responses/EventTypeResponse";
import { getAllEventTypes } from "../../api/EventType/eventTypeService";

export const useEventTypes = () => {
  const [eventTypes, setEventTypes] = useState<EventTypeResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllEventTypes();
        setEventTypes(data);
      } catch (err: any) {
        setError(err.message || "Bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };
    fetchEventTypes();
  }, []);

  return { eventTypes, loading, error };
};
