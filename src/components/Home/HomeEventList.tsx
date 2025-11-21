import type { EventResponse } from "../../models/Event/Responses/EventResponse";
import EventCard from "../Event/EventCard";
import styles from "./HomeEventList.module.css";

interface HomeEventListProps {
  events: EventResponse[];
}

const HomeEventList = ({ events }: HomeEventListProps) => {
  if (events.length === 0) {
    return (
      <div className={styles.noEvents}>
        <div className={styles.icon}>🔍</div>
        
        <div className={styles.noEventsTitle}>
          Aradığınız Kriterlere Uygun Etkinlik Yok
        </div>
        
        <div className={styles.noEventsText}>
          Filtrelerinizi değiştirerek veya temizleyerek tekrar aramayı deneyin. 
          Şehrinizdeki en popüler etkinlikleri kaçırmayın!
        </div>
      </div>
    );
  }

  return (
    <div className={styles.eventGrid}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default HomeEventList;
