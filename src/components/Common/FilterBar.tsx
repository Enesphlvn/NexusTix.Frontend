import type React from "react";
import type { CityResponse } from "../../models/City/Responses/CityResponse";
import type { EventTypeResponse } from "../../models/EventType/Responses/EventTypeResponse";
import styles from "./FilterBar.module.css";
import type { DistrictResponse } from "../../models/District/DistrictResponse";
import { FaSearch } from "react-icons/fa";

interface FilterBarProps {
  cities: CityResponse[];
  districts: DistrictResponse[];
  eventTypes: EventTypeResponse[];

  selectedCityId: string;
  selectedDistrictId: string;
  selectedEventTypeId: string;
  selectedDate: string;

  onCityChange: (id: string) => void;
  onDistrictChange: (id: string) => void;
  onEventTypeChange: (id: string) => void;
  onDateChange: (date: string) => void;

  onSearch: () => void;
}

const FilterBar = ({
  cities,
  districts,
  eventTypes,
  selectedCityId,
  selectedDistrictId,
  selectedEventTypeId,
  selectedDate,
  onCityChange,
  onDistrictChange,
  onEventTypeChange,
  onDateChange,
  onSearch,
}: FilterBarProps) => {
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form className={styles.filterBar} onSubmit={handleFilterSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="eventType">Ne Arıyorsunuz?</label>
        <select
          id="eventType"
          className={styles.selectInput}
          value={selectedEventTypeId}
          onChange={(e) => onEventTypeChange(e.target.value)}
        >
          <option value="">Tüm Etkinlik Tipleri</option>
          {eventTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="city">Nerede?</label>
        <select
          id="city"
          className={styles.selectInput}
          value={selectedCityId}
          onChange={(e) => onCityChange(e.target.value)}
        >
          <option value="">Tüm Şehirler</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="district">İlçe</label>
        <select
          id="district"
          className={styles.selectInput}
          value={selectedDistrictId}
          onChange={(e) => onDistrictChange(e.target.value)}
          disabled={districts.length === 0}
        >
          <option value="">Tüm İlçeler</option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="date">Ne Zaman?</label>
        <input
          type="date"
          id="date"
          className={styles.dateInput}
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>&nbsp;</label>
        <button type="submit" className={styles.submitButton}>
          <FaSearch size={20} />
        </button>
      </div>
    </form>
  );
};

export default FilterBar;
