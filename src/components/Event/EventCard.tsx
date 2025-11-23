import { useNavigate } from "react-router-dom";
import styles from "./EventCard.module.css";
import { FaArrowRight, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import type { EventListResponse } from "../../models/Event/Responses/EventListResponse";

interface EventCardProps {
  event: EventListResponse;
}

const EventCard = ({ event }: EventCardProps) => {
  const navigate = useNavigate();

  const eventDate = new Date(event.date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const handleNavigate = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigate(`/events/${event.id}`);
  };

  return (
    <div className={styles.card} onClick={handleNavigate}>
      <div className={styles.categoryBadge}>{event.eventTypeName}</div>

      <div className={styles.cardContent}>
        <div className={styles.infoGroup}>
          <h3 className={styles.cardTitle}>{event.name}</h3>

          <div className={styles.metaInfo}>
            <div className={styles.infoItem}>
              <FaMapMarkerAlt className={styles.infoIcon} />
              <span className={styles.venueText}>
                {event.venueName}, {event.districtName} / {event.cityName}
              </span>
            </div>

            <div className={styles.infoItem}>
              <FaCalendarAlt className={styles.infoIcon} />
              <span>{eventDate}</span>
            </div>
          </div>
        </div>

        <div className={styles.cardFooter}>
          <p className={styles.cardPrice}>{event.price} TL</p>

          <button className={styles.detailButton} onClick={handleNavigate}>
            İncele <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
