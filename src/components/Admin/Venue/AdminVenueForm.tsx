import type { CityResponse } from "../../../models/City/Responses/CityResponse";
import type { DistrictResponse } from "../../../models/District/DistrictResponse";
import styles from "../AdminForm.module.css";

interface AdminVenueFormProps {
  name: string;
  setName: (val: string) => void;
  capacity: number;
  setCapacity: (val: number) => void;
  cityId: number;
  setCityId: (val: number) => void;
  districtId: number;
  setDistrictId: (val: number) => void;

  cities: CityResponse[];
  districts: DistrictResponse[];

  loading: boolean;
  isEditMode: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

const AdminVenueForm = (props: AdminVenueFormProps) => {
  const {
    name,
    setName,
    capacity,
    setCapacity,
    cityId,
    setCityId,
    districtId,
    setDistrictId,
    cities,
    districts,
    loading,
    isEditMode,
    handleSubmit,
  } = props;

  return (
    <div className={styles.container}>
      <h2 className={styles.formTitle}>
        {isEditMode ? "Mekanı Düzenle" : "Yeni Mekan Ekle"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Mekan Adı</label>
          <input
            type="text"
            className={styles.input}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
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

        <div className={styles.formGroup}>
          <label>Şehir</label>
          <select
            className={styles.input}
            required
            value={cityId}
            onChange={(e) => {
              setCityId(Number(e.target.value));
              setDistrictId(0);
            }}
          >
            <option value={0}>Seçiniz...</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>İlçe</label>
          <select
            className={styles.input}
            required
            value={districtId}
            onChange={(e) => setDistrictId(Number(e.target.value))}
            disabled={!cityId || districts.length === 0}
          >
            <option value={0}>Seçiniz...</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
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

export default AdminVenueForm;
