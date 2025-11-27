import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createVenue,
  getVenueForAdmin,
  updateVenue,
} from "../../api/Venue/venueService";
import { toast } from "react-toastify";
import type { UpdateVenueRequest } from "../../models/Venue/Requests/UpdateVenueRequest";
import type { CreateVenueRequest } from "../../models/Venue/Requests/CreateVenueRequest";

export const useVenueForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [cityId, setCityId] = useState<number>(0);
  const [districtId, setDistrictId] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      const loadVenue = async () => {
        try {
          setInitialLoading(true);
          const venue = await getVenueForAdmin(Number(id));

          setName(venue.name);
          setCapacity(venue.capacity);
          setLatitude(venue.latitude);
          setLongitude(venue.longitude);
          setCityId(venue.cityId);
          setDistrictId(venue.districtId);
        } catch (error) {
          toast.error("Mekan bilgileri yüklenemedi.");
          navigate("/admin/venues");
        } finally {
          setInitialLoading(false);
        }
      };
      loadVenue();
    }
  }, [id, isEditMode, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || capacity <= 0 || !districtId) {
      toast.warning("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      setLoading(true);
      if (isEditMode && id) {
        const request: UpdateVenueRequest = {
          id: Number(id),
          name,
          capacity,
          latitude,
          longitude,
          districtId,
        };
        await updateVenue(request);
        toast.success("Mekan güncellendi.");
      } else {
        const request: CreateVenueRequest = {
          name,
          capacity,
          latitude,
          longitude,
          districtId,
        };
        await createVenue(request);
        toast.success("Yeni mekan oluşturuldu.");
      }
      navigate("/admin/venues");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    capacity,
    setCapacity,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    cityId,
    setCityId,
    districtId,
    setDistrictId,
    loading,
    initialLoading,
    isEditMode,
    handleSubmit,
  };
};
