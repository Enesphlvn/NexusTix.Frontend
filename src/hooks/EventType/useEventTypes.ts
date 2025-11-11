import { useEffect, useState } from "react";
import type { EventType } from "../../models/EventType/Responses/EventType";
import { getAllEventTypes } from "../../api/EventType/eventTypeService";

export const useEventTypes = () => {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
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
