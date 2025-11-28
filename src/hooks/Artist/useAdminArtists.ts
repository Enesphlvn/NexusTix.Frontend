import { useCallback, useEffect, useState } from "react";
import type { ArtistResponse } from "../../models/Artist/Responses/ArtistResponse";
import { getAllArtists, passiveArtist } from "../../api/Artist/artistService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const useAdminArtists = () => {
  const [artists, setArtists] = useState<ArtistResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArtists = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getAllArtists();

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

  const handlePassive = async (id: number) => {
    const result = await Swal.fire({
      title: "Sanatçıyı Kaldır?",
      text: "Sanatçı pasife alınacak. Geçmiş etkinlik verileri korunur.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f0ad4e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet, Kaldır",
      cancelButtonText: "Vazgeç",
    });

    if (result.isConfirmed) {
      try {
        await passiveArtist(id);
        toast.success("Sanatçı başarıyla pasife alındı.");
        fetchArtists();
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

  return { artists, loading, error, refetch: fetchArtists, handlePassive };
};
