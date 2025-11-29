import { useCallback, useEffect, useState } from "react";
import {
  getAllVenuesForAdmin,
  passiveVenue,
} from "../../api/Venue/venueService";
import type { VenueAdminResponse } from "../../models/Venue/Responses/VenueAdminResponse";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const useAdminVenues = () => {
  const [venues, setVenues] = useState<VenueAdminResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVenues = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getAllVenuesForAdmin();

      setVenues(data);
    } catch (err: any) {
      setError(err.message || "Mekanlar yüklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  const handlePassive = async (id: number, isActive: boolean) => {
    const actionText = isActive ? "Pasife" : "Aktife";
    const confirmColor = isActive ? "#d33" : "#28a745";

    const result = await Swal.fire({
      title: `Mekanı ${actionText} Al?`,
      text: isActive
        ? "Mekan pasife alınacak ve listelerden kaldırılacaktır."
        : "Mekan tekrar aktif hale gelecektir.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: confirmColor,
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Evet, ${actionText} Al`,
      cancelButtonText: "Vazgeç",
    });

    if (result.isConfirmed) {
      try {
        await passiveVenue(id);
        toast.success(`Mekan başarıyla ${actionText.toLowerCase()} alındı.`);
        fetchVenues();
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

  return { venues, loading, error, refetch: fetchVenues, handlePassive };
};
