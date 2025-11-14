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
        <div className={styles.noEventsTitle}>Sonuç Bulunamadı 😔</div>
        <div className={styles.noEventsText}>
          Seçtiğiniz filtrelere uygun bir etkinlik bulamadık. Lütfen farklı bir
          şehir veya tarih seçmeyi deneyin.
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
