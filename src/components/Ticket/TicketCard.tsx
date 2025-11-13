import { QRCodeSVG } from "qrcode.react";
import type { TicketByUserResponse } from "../../models/Ticket/Responses/TicketByUserResponse";
import styles from "./TicketCard.module.css";
import Swal from "sweetalert2";
import { cancelTicket } from "../../api/Ticket/ticketService";
import { toast } from "react-toastify";

interface TicketCardProps {
  ticket: TicketByUserResponse;
  onRefresh: () => void;
}

const TicketCard = ({ ticket, onRefresh }: TicketCardProps) => {
  const formattedDate = new Date(ticket.eventDate).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  let statusClass = styles.active;
  let statusText = "Aktif Bilet";

  if (ticket.isCancelled) {
    statusClass = styles.cancelled;
    statusText = "İPTAL EDİLDİ";
  } else if (ticket.isUsed) {
    statusClass = styles.used;
    statusText = "KULLANILDI";
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
    <div className={styles.card}>
      <div className={styles.infoSection}>
        <h2 className={styles.eventName}>{ticket.eventName}</h2>
        <p className={styles.venueInfo}>
          📍 {ticket.venueName}, {ticket.cityName}
        </p>
        <p className={styles.eventDate}>📅 {formattedDate}</p>

        <div className={`${styles.statusBadge} ${statusClass}`}>
          {statusText}
        </div>

        {!ticket.isUsed && !ticket.isCancelled && (
          <button className={styles.cancelButton} onClick={handleCancelClick}>
            Bileti İptal Et
          </button>
        )}
      </div>

      <div className={styles.qrSection}>
        {ticket.isCancelled || ticket.isUsed ? (
          <div style={{ textAlign: "center", color: "#999" }}>
            <span style={{ fontSize: "2rem" }}>🚫</span>
            <p style={{ margin: 0, fontSize: "0.8rem" }}>Geçersiz</p>
          </div>
        ) : (
          <QRCodeSVG value={ticket.qrCodeGuid} size={100} level={"H"} />
        )}
      </div>
    </div>
  );
};

export default TicketCard;
