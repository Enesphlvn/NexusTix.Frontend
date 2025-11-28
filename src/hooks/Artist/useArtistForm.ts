import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createArtist,
  getArtist,
  updateArtist,
} from "../../api/Artist/artistService";
import { toast } from "react-toastify";
import type { UpdateArtistRequest } from "../../models/Artist/Requests/UpdateArtistRequest";
import type { CreateArtistRequest } from "../../models/Artist/Requests/CreateArtistRequest";

export const useArtistForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      const loadArtist = async () => {
        try {
          setInitialLoading(true);
          const data = await getArtist(Number(id));

          setName(data.name);
          setBio(data.bio || "");
          setImageUrl(data.imageUrl || "");
        } catch (error) {
          toast.error("Sanatçı bilgileri yüklenemedi.");
          navigate("/admin/artists");
        } finally {
          setInitialLoading(false);
        }
      };
      loadArtist();
    }
  }, [id, isEditMode, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name) {
      toast.warning("Lütfen sanatçı adını giriniz.");
      return;
    }

    try {
      setLoading(true);
      if (isEditMode && id) {
        const request: UpdateArtistRequest = {
          id: Number(id),
          name,
          bio: bio || null,
          imageUrl: imageUrl || null,
        };
        await updateArtist(request);
        toast.success("Sanatçı güncellendi.");
      } else {
        const request: CreateArtistRequest = {
          name,
          bio: bio || null,
          imageUrl: imageUrl || null,
        };
        await createArtist(request);
        toast.success("Yeni sanatçı eklendi.");
      }
      navigate("/admin/artists");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    bio,
    setBio,
    imageUrl,
    setImageUrl,
    loading,
    initialLoading,
    isEditMode,
    handleSubmit,
  };
};
