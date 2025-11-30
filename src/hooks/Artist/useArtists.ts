import { useEffect, useState } from "react";
import type { ArtistResponse } from "../../models/Artist/Responses/ArtistResponse";
import { getAllArtists } from "../../api/Artist/artistService";
import { toast } from "react-toastify";

export const useArtists = () => {
  const [artists, setArtists] = useState<ArtistResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);

        const data = await getAllArtists();

        setArtists(data);
      } catch (err: any) {
        setError(err.message || "Sanatçılar yüklenirken hata oluştu.");
        toast.error("Sanatçı listesi alınamadı.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return { artists, loading, error };
};
