import { useEffect, useState } from "react";
import type { TicketResponse } from "../../models/Ticket/Responses/TicketResponse";
import { getMyTickets } from "../../api/Ticket/ticketService";

export const useMyTickets = () => {
  const [tickets, setTickets] = useState<TicketResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);

        const data = await getMyTickets();

        setTickets(data);
      } catch (err: any) {
        setError(err.message || "Biletler yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return { tickets, loading, error };
};
