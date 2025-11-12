import type { EventAggregate } from "../../models/Event/Responses/EventAggregate";
import styles from "../Event/EventDetail.module.css";

interface EventDetailProps {
  event: EventAggregate;
  onBuyClick: () => void;
}

const EventDetail = ({ event, onBuyClick }: EventDetailProps) => {
  const formattedDate = new Date(event.date).toLocaleDateString("tr-TR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{event.name}</h1>
        <div className={styles.date}>{formattedDate}</div>
      </div>

      <div className={styles.content}>
        <div className={styles.descriptionSection}>
          <h3>Etkinlik Hakkında</h3>
          <p className={styles.description}>
            {event.description || "Bu etkinlik için açıklama girilmemiş."}
          </p>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Kategori</span>
            <span className={styles.value}>{event.eventType.name}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Mekan</span>
            <span className={styles.value}>{event.venue.name}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Kapasite</span>
            <span className={styles.value}>{event.capacity} Kişilik</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Bilet Fiyatı</span>
            <span className={styles.price}>{event.price} TL</span>
          </div>

          <button onClick={onBuyClick} className={styles.buyButton}>
            Bilet Satın Al
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
