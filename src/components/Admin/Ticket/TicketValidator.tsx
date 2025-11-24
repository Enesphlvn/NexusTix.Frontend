import { useState } from "react";
import { checkInTicket } from "../../../api/Ticket/ticketService";
import { FaCheckCircle, FaQrcode, FaTimesCircle } from "react-icons/fa";
import styles from "./TicketValidator.module.css";
import { useAdminEvents } from "../../../hooks/Event/useAdminEvents";
import { toast } from "react-toastify";

const TicketValidator = () => {
  const { events } = useAdminEvents();

  const [selectedEventId, setSelectedEventId] = useState<number>(0);
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedEventId === 0) {
      toast.warning("Lütfen önce bir etkinlik seçiniz.");
      return;
    }

    if (!qrCode) {
      toast.warning("Lütfen QR kod alanını doldurunuz.");
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      await checkInTicket(qrCode, selectedEventId);

      setStatus("success");
      setMessage("Giriş Başarılı! Bilet onaylandı.");
      setQrCode("");
    } catch (err: any) {
      setStatus("error");

      if (err.message.includes("JSON") || err.message.includes("Path:")) {
        setMessage("Geçersiz QR Kod formatı! Lütfen kodu kontrol ediniz.");
      } else {
        setMessage(err.message || "Bilet doğrulanamadı.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.validatorContainer}>
      <div className={styles.iconWrapper}>
        <FaQrcode />
      </div>
      <h2 className={styles.title}>Bilet Kontrol Terminali</h2>
      <p className={styles.subtitle}>
        Katılımcının biletini doğrulamak için aşağıdaki bilgileri giriniz.
      </p>

      <form onSubmit={handleCheckIn}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Etkinlik Seçiniz</label>
          <select
            className={styles.select}
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(Number(e.target.value))}
          >
            <option value={0}>Listeden bir etkinlik seçin...</option>
            {events.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.name} ({new Date(evt.date).toLocaleDateString()})
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>QR Kod (GUID)</label>
          <div className={styles.inputGroup}>
            <FaQrcode className={styles.inputIcon} />
            <input
              type="text"
              className={`${styles.input} ${styles.inputWithIcon}`}
              placeholder="e652e510-92ba-..."
              value={qrCode}
              onChange={(e) => {
                setQrCode(e.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              disabled={loading || selectedEventId === 0}
              autoFocus
            />
          </div>
        </div>

        <button
          type="submit"
          className={styles.checkButton}
          disabled={loading || !qrCode || selectedEventId === 0}
        >
          {loading ? "Kontrol Ediliyor..." : "Bileti Doğrula & İçeri Al"}
        </button>
      </form>

      {status === "success" && (
        <div className={`${styles.resultContainer} ${styles.success}`}>
          <FaCheckCircle className={styles.resultIcon} />
          <h3 className={styles.resultTitle}>İşlem Başarılı</h3>
          <p className={styles.resultText}>{message}</p>
        </div>
      )}

      {status === "error" && (
        <div className={`${styles.resultContainer} ${styles.error}`}>
          <FaTimesCircle className={styles.resultIcon} />
          <h3 className={styles.resultTitle}>Giriş Reddedildi</h3>
          <p className={styles.resultText}>{message}</p>
        </div>
      )}
    </div>
  );
};

export default TicketValidator;
