import { QRCodeSVG } from "qrcode.react";
import type { TicketByUserResponse } from "../../models/Ticket/Responses/TicketByUserResponse";
import styles from "./TicketCard.module.css";

interface TicketCardProps {
  ticket: TicketByUserResponse;
}

const TicketCard = ({ ticket }: TicketCardProps) => {
  const formattedDate = new Date(ticket.eventDate).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.card}>
      <div className={styles.infoSection}>
        <h2 className={styles.eventName}>{ticket.eventName}</h2>

        <p className={styles.venueInfo}>
          📍 {ticket.venueName}, {ticket.cityName}
        </p>

        <p className={styles.eventDate}>📅 {formattedDate}</p>

        <div
          className={`${styles.statusBadge} ${
            ticket.isUsed ? styles.used : styles.active
          }`}
        >
          {ticket.isUsed ? "Kullanıldı" : "Aktif Bilet"}
        </div>
      </div>

      <div className={styles.qrSection}>
        <QRCodeSVG value={ticket.qrCodeGuid} size={100} level={"H"} />
      </div>
    </div>
  );
};

export default TicketCard;
