import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createEvent,
  getEventById,
  updateEvent,
} from "../../api/Event/eventService";
import { toast } from "react-toastify";
import type { UpdateEventRequest } from "../../models/Event/Requests/UpdateEventRequest";
import type { CreateEventRequest } from "../../models/Event/Requests/CreateEventRequest";

export const useEventForm = (id?: string) => {
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState<number>(0);
  const [eventTypeId, setEventTypeId] = useState<number>(0);
  const [venueId, setVenueId] = useState<number>(0);
  const [artistIds, setArtistIds] = useState<number[]>([]);

  const [selectedCityId, setSelectedCityId] = useState<number>(0);
  const [selectedDistrictId, setSelectedDistrictId] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      const loadEvent = async () => {
        try {
          setInitialLoading(true);
          const event = await getEventById(Number(id));

          setName(event.name);
          setDate(new Date(event.date).toISOString().slice(0, 16));
          setPrice(event.price);
          setDescription(event.description || "");
          setCapacity(event.capacity);
          setEventTypeId(event.eventTypeId);
          setVenueId(event.venueId);
          if (event.artistIds) {
            setArtistIds(event.artistIds);
          }
        } catch (error: any) {
          toast.error("Etkinlik bilgileri yüklenemedi.");
          navigate("/admin/events");
        } finally {
          setInitialLoading(false);
        }
      };
      loadEvent();
    }
  }, [id, isEditMode, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name ||
      !date ||
      price < 0 ||
      capacity <= 0 ||
      eventTypeId === 0 ||
      venueId === 0
    ) {
      toast.warning("Lütfen tüm zorunlu alanları doğru doldurun.");
      return;
    }

    try {
      setLoading(true);

      if (isEditMode && id) {
        const request: UpdateEventRequest = {
          id: Number(id),
          name,
          date: new Date(date).toISOString(),
          price,
          description,
          capacity,
          eventTypeId,
          venueId,
          artistIds,
        };
        await updateEvent(request);
        toast.success("Etkinlik başarıyla güncellendi.");
      } else {
        const request: CreateEventRequest = {
          name,
          date: new Date(date).toISOString(),
          price,
          description,
          capacity,
          eventTypeId,
          venueId,
          artistIds,
        };
        await createEvent(request);
        toast.success("Yeni etkinlik başarıyla oluşturuldu.");
      }

      navigate("/admin/events");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    date,
    setDate,
    price,
    setPrice,
    description,
    setDescription,
    capacity,
    setCapacity,
    eventTypeId,
    setEventTypeId,
    venueId,
    setVenueId,
    artistIds,
    setArtistIds,
    selectedCityId,
    setSelectedCityId,
    selectedDistrictId,
    setSelectedDistrictId,

    loading,
    initialLoading,
    isEditMode,

    handleSubmit,
  };
};
