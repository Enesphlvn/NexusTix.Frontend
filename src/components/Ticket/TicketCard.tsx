import { QRCodeSVG } from "qrcode.react";
import type { TicketByUserResponse } from "../../models/Ticket/Responses/TicketByUserResponse";
import styles from "./TicketCard.module.css";
import Swal from "sweetalert2";
import { cancelTicket } from "../../api/Ticket/ticketService";
import { toast } from "react-toastify";
import { FaBan, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

interface TicketCardProps {
  ticket: TicketByUserResponse;
  onRefresh: () => void;
}

const TicketCard = ({ ticket, onRefresh }: TicketCardProps) => {
  const eventDateObj = new Date(ticket.eventDate);
  const now = new Date();
  const isExpired = eventDateObj < now;

  const formattedDate = eventDateObj.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  let statusClass = styles.active;
  let cardModClass = "";
  let statusText = "Aktif Bilet";

  if (ticket.isCancelled) {
    statusClass = styles.cancelled;
    cardModClass = styles.cardCancelled;
    statusText = "İPTAL EDİLDİ";
  } else if (ticket.isUsed) {
    statusClass = styles.used;
    cardModClass = styles.cardUsed;
    statusText = "KULLANILDI";
  } else if (isExpired) {
    statusClass = styles.expired;
    cardModClass = styles.cardExpired;
    statusText = "SÜRESİ DOLDU";
  }

  const handleCancelClick = async () => {
    const result = await Swal.fire({
      title: "Bileti İptal Et?",
      text: "Bu işlem geri alınamaz! Biletiniz geçersiz sayılacaktır.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Evet, İptal Et",
      cancelButtonText: "Vazgeç",
    });

    if (result.isConfirmed) {
      try {
        await cancelTicket(ticket.id);

        await Swal.fire(
          "İptal Edildi!",
          "Biletiniz başarıyla iptal edilmiştir.",
          "success"
        );

        onRefresh();
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className={`${styles.card} ${cardModClass}`}>
      <div className={styles.infoSection}>
        <div className={styles.headerGroup}>
          <h2 className={styles.eventName}>{ticket.eventName}</h2>
          <p className={styles.venueInfo}>
            <FaMapMarkerAlt className={styles.infoIcon} style={{ marginRight: "0.5rem" }}/>
            {ticket.venueName}, {ticket.cityName}
          </p>
        </div>

        <div className={styles.dateGroup}>
          <span className={styles.dateIcon}>
            <FaCalendarAlt
              className={styles.infoIcon}
              style={{ marginRight: "0.5rem" }}
            />
            {formattedDate}
          </span>
        </div>

        <div className={styles.footer}>
          <div className={`${styles.statusBadge} ${statusClass}`}>
            {statusText}
          </div>

          {!ticket.isUsed && !ticket.isCancelled && !isExpired && (
            <button className={styles.cancelButton} onClick={handleCancelClick}>
              İptal Et
            </button>
          )}
        </div>
      </div>

      <div className={styles.qrSection}>
        <div className={styles.notchTop}></div>
        <div className={styles.notchBottom}></div>

        {ticket.isCancelled || ticket.isUsed || isExpired ? (
          <div className={styles.invalidState}>
            <div className={styles.invalidIcon}>
              <FaBan />
            </div>
            <p className={styles.invalidText}>
              {ticket.isCancelled
                ? "İptal Edildi"
                : ticket.isUsed
                ? "Kullanıldı"
                : isExpired
                ? "Süresi Doldu"
                : "Geçersiz"}
            </p>
          </div>
        ) : (
          <QRCodeSVG value={ticket.qrCodeGuid} size={110} level={"H"} />
        )}
      </div>
    </div>
  );
};

export default TicketCard;
