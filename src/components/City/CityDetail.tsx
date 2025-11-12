import type { CityResponse } from "../../models/City/Responses/CityResponse";
import styles from "./CityDetail.module.css";

interface CityDetailProps {
  city: CityResponse;
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
