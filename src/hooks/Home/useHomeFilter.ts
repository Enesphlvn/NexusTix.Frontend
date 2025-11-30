import { useSearchParams } from "react-router-dom";
import type { EventFiltersRequest } from "../../models/Event/Requests/EventFiltersRequest";
import { useEffect, useMemo, useState } from "react";
import { useEvents } from "../Event/useEvents";
import { useCities } from "../City/useCities";
import { useEventTypes } from "../EventType/useEventTypes";
import { useDistrictsByCity } from "../District/useDistrictsByCity";
import type { ArtistResponse } from "../../models/Artist/Responses/ArtistResponse";
import { getAllArtists, getArtistsByEventType } from "../../api/Artist/artistService";
import type { EventTypeResponse } from "../../models/EventType/Responses/EventTypeResponse";
import { getEventTypesByArtist } from "../../api/EventType/eventTypeService";

export const useHomeFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeFilters: EventFiltersRequest = useMemo(
    () => ({
      cityId: searchParams.get("city")
        ? Number(searchParams.get("city"))
        : undefined,
      districtId: searchParams.get("district")
        ? Number(searchParams.get("district"))
        : undefined,
      eventTypeId: searchParams.get("type")
        ? Number(searchParams.get("type"))
        : undefined,
      artistId: searchParams.get("artist") 
        ? Number(searchParams.get("artist")) 
        : undefined,
      date: searchParams.get("date") || undefined,
    }),
    [searchParams]
  );

  const [draftFilters, setDraftFilters] = useState<EventFiltersRequest>(activeFilters);
  const [artists, setArtists] = useState<ArtistResponse[]>([]);
  const [filteredEventTypes, setFilteredEventTypes] = useState<EventTypeResponse[]>([]);

  useEffect(() => {
    setDraftFilters(activeFilters);
  }, [activeFilters]);

  const { events, loading: eventsLoading, error: eventsError, } = useEvents(activeFilters);
  const { cities, loading: citiesLoading } = useCities();
  const { eventTypes: allEventTypes, loading: eventTypesLoading } = useEventTypes();
  const { districts } = useDistrictsByCity(draftFilters.cityId);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        if (draftFilters.eventTypeId) {
          const data = await getArtistsByEventType(draftFilters.eventTypeId);
          setArtists(data);
        }else{
          const data = await getAllArtists();
          setArtists(data);
        }
      } catch (err) {
        console.error("Sanatçılar yüklenemedi", err);
        setArtists([]);
      }
    };
    fetchArtists();
  }, [draftFilters.eventTypeId]);

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        if (draftFilters.artistId) {
          const data = await getEventTypesByArtist(draftFilters.artistId);
          setFilteredEventTypes(data);
        } else {
          if (allEventTypes.length > 0) setFilteredEventTypes(allEventTypes);
        }
      } catch (err) {
        console.error("Kategoriler yüklenemedi", err);
      }
    };
    fetchEventTypes();
  }, [draftFilters.artistId, allEventTypes]);

  const isLoading = eventsLoading || citiesLoading || eventTypesLoading;

  const handleCityChange = (id: string) => {
    setDraftFilters((prev) => ({
      ...prev,
      cityId: id ? Number(id) : undefined,
      districtId: undefined,
    }));
  };

  const handleDistrictChange = (id: string) => {
    setDraftFilters((prev) => ({
      ...prev,
      districtId: id ? Number(id) : undefined,
    }));
  };

  const handleEventTypeChange = (id: string) => {
    setDraftFilters((prev) => ({
      ...prev,
      eventTypeId: id ? Number(id) : undefined,
    }));
  };

  const handleArtistChange = (id: string) => {
    setDraftFilters((prev) => ({
      ...prev,
      artistId: id ? Number(id) : undefined,
    }));
  };

  const handleDateChange = (date: string) => {
    setDraftFilters((prev) => ({ ...prev, date: date || undefined }));
  };

  const handleSearch = () => {
    const params: any = {};
    if (draftFilters.cityId) params.city = draftFilters.cityId.toString();
    if (draftFilters.districtId)
      params.district = draftFilters.districtId.toString();
    if (draftFilters.eventTypeId)
      params.type = draftFilters.eventTypeId.toString();
    if (draftFilters.artistId) params.artist = draftFilters.artistId.toString();
    if (draftFilters.date) params.date = draftFilters.date;
    setSearchParams(params);
  };

  return {
    activeFilters,
    draftFilters,
    events,
    cities,
    eventTypes: filteredEventTypes,
    districts,
    artists,
    isLoading,
    eventsError,
    handleCityChange,
    handleDistrictChange,
    handleEventTypeChange,
    handleArtistChange,
    handleDateChange,
    handleSearch,
  };
};
