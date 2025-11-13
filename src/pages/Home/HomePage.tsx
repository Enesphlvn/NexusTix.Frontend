import { useEffect, useMemo, useState } from "react";
import FilterBar from "../../components/Common/FilterBar";
import EventCard from "../../components/Event/EventCard";
import { useCities } from "../../hooks/City/useCities";
import { useEvents } from "../../hooks/Event/useEvents";
import { useEventTypes } from "../../hooks/EventType/useEventTypes";
import styles from "./HomePage.module.css";
import type { EventFiltersResponse } from "../../models/Event/Responses/EventFiltersResponse";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeFilters: EventFiltersResponse = useMemo(() => {
    return {
      cityId: searchParams.get("city")
        ? Number(searchParams.get("city"))
        : undefined,
      eventTypeId: searchParams.get("type")
        ? Number(searchParams.get("type"))
        : undefined,
      date: searchParams.get("date") || undefined,
    };
  }, [searchParams]);

  const [draftFilters, setDraftFilters] =
    useState<EventFiltersResponse>(activeFilters);

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

  const isLoading = eventsLoading || citiesLoading || eventTypesLoading;

  const handleCityChange = (id: string) => {
    setDraftFilters((prev) => ({
      ...prev,
      cityId: id ? Number(id) : undefined,
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
    if (draftFilters.eventTypeId)
      params.type = draftFilters.eventTypeId.toString();
    if (draftFilters.date) params.date = draftFilters.date;

    setSearchParams(params);
  };

  if (isLoading) return <LoadingSpinner />;
  if (eventsError)
    return <div style={{ color: "red" }}>Hata: {eventsError}</div>;

  return (
    <div className={styles.pageContainer}>
      <FilterBar
        cities={cities}
        eventTypes={eventTypes}
        selectedCityId={draftFilters.cityId?.toString() || ""}
        selectedEventTypeId={draftFilters.eventTypeId?.toString() || ""}
        selectedDate={draftFilters.date || ""}
        onCityChange={handleCityChange}
        onEventTypeChange={handleEventTypeChange}
        onDateChange={handleDateChange}
        onSearch={handleSearch}
      />

      <h1 className={styles.header}>
        {activeFilters.cityId || activeFilters.eventTypeId || activeFilters.date
          ? "Arama Sonuçları"
          : "Yaklaşan Etkinlikler"}
      </h1>

      <div className={styles.eventGrid}>
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <div className={styles.noEvents}>
            <div className={styles.noEventsTitle}>Sonuç Bulunamadı 😔</div>
            <div className={styles.noEventsText}>
              Seçtiğiniz filtrelere uygun bir etkinlik bulamadık. Lütfen farklı
              bir şehir veya tarih seçmeyi deneyin.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
