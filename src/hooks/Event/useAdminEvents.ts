import { useCallback, useEffect, useState } from "react";
import type { EventAdminResponse } from "../../models/Event/Responses/EventAdminResponse";
import { getAllEventsForAdmin, passiveEvent, } from "../../api/Event/eventService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const useAdminEvents = () => {
  const [events, setEvents] = useState<EventAdminResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllEventsForAdmin();
      setEvents(data);
    } catch (err: any) {
      setError(
        err.message || "Admin etkinlik listesi yüklenirken hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handlePassive = async (id: number, isActive: boolean) => {
    const actionText = isActive ? "Pasife" : "Aktife";
    const confirmColor = isActive ? "#d33" : "#28a745";

    const result = await Swal.fire({
      title: `Etkinliği ${actionText} Al?`,
      text: isActive
        ? "Etkinlik pasife alınacak ve listelerden kaldırılacaktır."
        : "Etkinlik tekrar aktif hale gelecektir.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: confirmColor,
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Evet, ${actionText} Al`,
      cancelButtonText: "Vazgeç",
    });
 
    if (result.isConfirmed) {
      try {
        await passiveEvent(id);
        toast.success(`Etkinlik başarıyla ${actionText.toLowerCase()} alındı.`);
        fetchEvents();
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

  return { events, loading, error, refetch: fetchEvents, handlePassive };
};
