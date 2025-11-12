import { useEffect, useState } from "react";
import type { EventAggregate } from "../../models/Event/Responses/EventAggregate";
import { getEvent } from "../../api/Event/eventService";

export const useEvent = (id: string | undefined) => {
  const [event, setEvent] = useState<EventAggregate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getEvent(Number(id));

        setEvent(data);
      } catch (err: any) {
        setError(err.message || "Etkinlik detayı yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  return { event, loading, error };
};
