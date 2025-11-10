import type { City } from "../../models/City/City";

interface CityDetailProps {
  city: City;
}

const CityDetail = ({ city }: CityDetailProps) => {
  return (
    <div>
      <h1>Şehir Detayı</h1>
      <h3>{city.name}</h3>
      <p>ID: {city.id}</p>
    </div>
  );
};

export default CityDetail;
