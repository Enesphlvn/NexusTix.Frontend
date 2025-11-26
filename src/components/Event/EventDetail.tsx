import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import type { EventAggregateResponse } from "../../models/Event/Responses/EventAggregateResponse";
import styles from "./EventDetail.module.css";

interface EventDetailProps {
  event: EventAggregateResponse;
  onBuyClick: () => void;
  soldCount: number | null;
  isSoldOut: boolean | null;
}

const EventDetail = ({
  event,
  onBuyClick,
  soldCount,
  isSoldOut,
}: EventDetailProps) => {
  const formattedDate = new Date(event.date).toLocaleDateString("tr-TR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const remainingTickets = event.capacity - (soldCount ?? 0);
  const occupancyRate = (soldCount ?? 0) / event.capacity;
  const isLowStock = remainingTickets > 0 && occupancyRate >= 0.8;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{event.name}</h1>
          <div className={styles.dateBadge}>📅 {formattedDate}</div>
        </div>
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
            <span className={styles.label}>Mekan & Konum</span>
            <span className={styles.value}>{event.venue.name}</span>

            <div className={styles.locationInfo}>
              <FaMapMarkerAlt className={styles.locationIcon} />
              <span>
                {event.venue.districtName}, {event.venue.cityName}
              </span>
            </div>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Kapasite Durumu</span>
            <span className={styles.value}>
              {soldCount !== null ? (
                <>
                  {soldCount} / {event.capacity} Satıldı
                  {isLowStock && (
                    <div className={styles.stockWarning}>
                      <FaClock />
                      <span>Tükenmek Üzere!</span>
                    </div>
                  )}
                </>
              ) : (
                "Yükleniyor..."
              )}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Bilet Fiyatı</span>
            <span className={styles.price}>{event.price} TL</span>
          </div>

          <button
            onClick={onBuyClick}
            disabled={isSoldOut || false}
            className={isSoldOut ? styles.soldOutButton : styles.buyButton}
          >
            {isSoldOut ? "TÜKENDİ" : "Bilet Satın Al"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
