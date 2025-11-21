import FilterBar from "../../components/Common/FilterBar";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import { useHomeFilter } from "../../hooks/Home/useHomeFilter";
import ErrorMessage from "../../components/Common/ErrorMessage";
import HomeEventList from "../../components/Home/HomeEventList";
import styles from "./HomePage.module.css";
import heroStyles from "./Hero.module.css";

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
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div className={heroStyles.heroContainer}>
        <div className={heroStyles.overlay}></div>

        <div className={heroStyles.content}>
          <h1 className={heroStyles.title}>Hayatın Ritmini Yakala!</h1>
          <p className={heroStyles.subtitle}>
            Konserlerden tiyatrolara, şehrindeki en iyi etkinlikleri keşfetmeye
            başla.
          </p>
        </div>

        <div className={heroStyles.filterWrapper}>
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
        </div>
      </div>

      <div className={styles.pageContainer}>
        <h1 className={styles.header}>
          {isFiltering ? "Arama Sonuçları" : "Yaklaşan Etkinlikler"}
        </h1>

        <HomeEventList events={events} />
      </div>
    </div>
  );
};

export default HomePage;
