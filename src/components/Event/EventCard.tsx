import type { Event } from "../../models/Event/Event";
import styles from "../Event/EventCard.module.css";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const eventDate = new Date(event.date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className={styles.card}>
      {/* <img src={...} alt={event.name} className={styles.cardImage} /> */}
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{event.name}</h3>
        <p className={styles.cardDate}>{eventDate}</p>
        <p className={styles.cardPrice}>{event.price} TL</p>
        {/* <p className={styles.cardVenue}>{event.venue.name}</p> */}
      </div>
    </div>
  );
};

export default EventCard;
