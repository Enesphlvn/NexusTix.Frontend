import type { City } from "../../models/City/City";

interface CityListProps {
  cities: City[];
}

const CityList = ({ cities }: CityListProps) => {
  return (
    <ul>
      {cities.map((city) => (
        <li key={city.id}>
          {city.name} (ID: {city.id})
        </li>
      ))}
    </ul>
  );
};

export default CityList;
