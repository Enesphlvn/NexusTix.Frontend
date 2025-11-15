import type { EventTypeResponse } from "../../../models/EventType/Responses/EventTypeResponse";
import type { VenueResponse } from "../../../models/Venue/Responses/VenueResponse";
import styles from "./AdminEventForm.module.css";

interface AdminEventFormProps {
  name: string;
  setName: (val: string) => void;
  date: string;
  setDate: (val: string) => void;
  price: number;
  setPrice: (val: number) => void;
  description: string;
  setDescription: (val: string) => void;
  capacity: number;
  setCapacity: (val: number) => void;
  eventTypeId: number;
  setEventTypeId: (val: number) => void;
  venueId: number;
  setVenueId: (val: number) => void;

  venues: VenueResponse[];
  eventTypes: EventTypeResponse[];

  loading: boolean;
  isEditMode: boolean;

  handleSubmit: (e: React.FormEvent) => void;
}

const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const AdminEventForm = (props: AdminEventFormProps) => {
  const {
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
    venues,
    eventTypes,
    loading,
    isEditMode,
    handleSubmit,
  } = props;

  return (
    <div className={styles.container}>
      <h2 className={styles.formTitle}>
        {isEditMode ? "Etkinliği Düzenle" : "Yeni Etkinlik Ekle"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Etkinlik Adı</label>
          <input
            type="text"
            className={styles.input}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Tarih ve Saat</label>
          <input
            type="datetime-local"
            className={styles.input}
            required
            min={getCurrentDateTime()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Bilet Fiyatı (TL)</label>
            <input
              type="number"
              min="0"
              className={styles.input}
              required
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Kapasite</label>
            <input
              type="number"
              min="1"
              className={styles.input}
              required
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Kategori</label>
          <select
            className={styles.input}
            required
            value={eventTypeId}
            onChange={(e) => setEventTypeId(Number(e.target.value))}
          >
            <option value={0}>Seçiniz...</option>
            {eventTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Mekan</label>
          <select
            className={styles.input}
            required
            value={venueId}
            onChange={(e) => setVenueId(Number(e.target.value))}
          >
            <option value={0}>Seçiniz...</option>
            {venues.map((venue) => (
              <option key={venue.id} value={venue.id}>
                {venue.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Açıklama</label>
          <textarea
            className={styles.input}
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Kaydediliyor..." : isEditMode ? "Güncelle" : "Oluştur"}
        </button>
      </form>
    </div>
  );
};

export default AdminEventForm;
