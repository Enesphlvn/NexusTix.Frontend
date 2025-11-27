import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import styles from "./EventMap.module.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface EventMapProps {
  latitude: number;
  longitude: number;
  venueName: string;
}

const EventMap = ({ latitude, longitude, venueName }: EventMapProps) => {
  if (!latitude || !longitude) return null;

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.mapTitle}>
        <FaMapMarkerAlt color="#007bff" /> Etkinlik Konumu
      </h3>

      <div className={styles.mapContainer}>
        <MapContainer
          center={[latitude, longitude]}
          zoom={15}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[latitude, longitude]}>
            <Popup>
              <strong>{venueName}</strong> <br />
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default EventMap;
