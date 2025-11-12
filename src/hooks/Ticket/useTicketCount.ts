import { useEffect, useState } from "react";
import { getTicketCountByEvent } from "../../api/Ticket/ticketService";

export const useTicketCount = (eventId: number | undefined) => {
  const [soldCount, setSoldCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!eventId) return;

    const fetchCount = async () => {
      try {
        setLoading(true);

        const count = await getTicketCountByEvent(eventId);

        setSoldCount(count);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, [eventId]);

  return { soldCount, loading };
};
