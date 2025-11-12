import type { CityResponse } from "../../models/City/Responses/CityResponse";
import styles from "./CityList.module.css";

interface CityListProps {
  cities: CityResponse[];
}

const CityList = ({ cities }: CityListProps) => {
  return (
    <div className={styles.listContainer}>
      <h1>Şehirler</h1>
      <ul className={styles.grid}>
        {cities.map((city) => (
          <li key={city.id} className={styles.card}>
            {city.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityList;
