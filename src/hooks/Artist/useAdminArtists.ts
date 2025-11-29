import { useCallback, useEffect, useState } from "react";
import { getAllArtistsForAdmin, passiveArtist, } from "../../api/Artist/artistService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import type { ArtistAdminResponse } from "../../models/Artist/Responses/ArtistAdminResponse";
 
export const useAdminArtists = () => {
  const [artists, setArtists] = useState<ArtistAdminResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArtists = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getAllArtistsForAdmin();

      setArtists(data);
    } catch (err: any) {
      setError(err.message || "Sanatçılar yüklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  const handlePassive = async (id: number, isActive: boolean) => {
    const actionText = isActive ? "Pasife" : "Aktife";
    const confirmColor = isActive ? "#d33" : "#28a745";

    const result = await Swal.fire({
      title: `Sanatçıyı ${actionText} Al?`,
      text: isActive
        ? "Sanatçı pasife alınacak ve listelerden kaldırılacaktır."
        : "Sanatçı tekrar aktif hale gelecektir.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: confirmColor,
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Evet, ${actionText} Al`,
      cancelButtonText: "Vazgeç",
    });
 
    if (result.isConfirmed) {
      try {
        await passiveArtist(id);
        toast.success(`Sanatçı başarıyla ${actionText.toLowerCase()} alındı.`);
        fetchArtists();
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

  return { artists, loading, error, refetch: fetchArtists, handlePassive };
};
