import { useSearchParams } from "react-router-dom";
import type { EventFiltersRequest } from "../../models/Event/Requests/EventFiltersRequest";
import { useEffect, useMemo, useState } from "react";
import { useEvents } from "../Event/useEvents";
import { useCities } from "../City/useCities";
import { useEventTypes } from "../EventType/useEventTypes";
import { useDistrictsByCity } from "../District/useDistrictsByCity";

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
      date: searchParams.get("date") || undefined,
    }),
    [searchParams]
  );

  const [draftFilters, setDraftFilters] =
    useState<EventFiltersRequest>(activeFilters);

  useEffect(() => {
    setDraftFilters(activeFilters);
  }, [activeFilters]);

  const {
    events,
    loading: eventsLoading,
    error: eventsError,
  } = useEvents(activeFilters);
  const { cities, loading: citiesLoading } = useCities();
  const { eventTypes, loading: eventTypesLoading } = useEventTypes();
  const { districts } = useDistrictsByCity(draftFilters.cityId);

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
    if (draftFilters.date) params.date = draftFilters.date;
    setSearchParams(params);
  };

  return {
    activeFilters,
    draftFilters,
    events,
    cities,
    eventTypes,
    districts,
    isLoading,
    eventsError,
    handleCityChange,
    handleDistrictChange,
    handleEventTypeChange,
    handleDateChange,
    handleSearch,
  };
};
