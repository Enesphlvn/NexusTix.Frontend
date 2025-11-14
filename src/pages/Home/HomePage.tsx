import FilterBar from "../../components/Common/FilterBar";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import { useHomeFilter } from "../../hooks/Home/useHomeFilter";
import ErrorMessage from "../../components/Common/ErrorMessage";
import HomeEventList from "../../components/Home/HomeEventList";
import styles from '../../components/Home/HomeEventList.module.css';

const HomePage = () => {
  const {
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
  } = useHomeFilter();

  if (isLoading) return <LoadingSpinner />;
  if (eventsError) return <ErrorMessage message={eventsError} />;

  const isFiltering =
    activeFilters.cityId ||
    activeFilters.eventTypeId ||
    activeFilters.date ||
    activeFilters.districtId;

  return (
    <div className={styles.pageContainer}>
      <FilterBar
        cities={cities}
        eventTypes={eventTypes}
        districts={districts}
        selectedCityId={draftFilters.cityId?.toString() || ""}
        selectedDistrictId={draftFilters.districtId?.toString() || ""}
        selectedEventTypeId={draftFilters.eventTypeId?.toString() || ""}
        selectedDate={draftFilters.date || ""}
        onCityChange={handleCityChange}
        onDistrictChange={handleDistrictChange}
        onEventTypeChange={handleEventTypeChange}
        onDateChange={handleDateChange}
        onSearch={handleSearch}
      />

      <h1 className={styles.header}>
        {isFiltering ? "Arama Sonuçları" : "Yaklaşan Etkinlikler"}
      </h1>

      <HomeEventList events={events} />
    </div>
  );
};

export default HomePage;
