import type { City } from "../../models/City/Responses/City";
import styles from "./CityDetail.module.css";

interface CityDetailProps {
  city: City;
}

const CityDetail = ({ city }: CityDetailProps) => {
  return (
    <div className={styles.detailContainer}>
      <h1 className={styles.header}>Şehir Detayı</h1>
      <h3 className={styles.cityName}>{city.name}</h3>
      <p className={styles.cityId}>ID: {city.id}</p>
    </div>
  );
};

export default CityDetail;
