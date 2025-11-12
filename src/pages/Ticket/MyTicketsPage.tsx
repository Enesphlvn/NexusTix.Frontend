import { useMyTickets } from "../../hooks/Ticket/useMyTickets";

const MyTicketsPage = () => {
  const { tickets, loading, error } = useMyTickets();

  if (loading) return <div>Biletleriniz yükleniyor...</div>;
  if (error) return <div style={{ color: "red" }}>Hata: {error}</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Biletlerim</h1>

      {tickets.length === 0 ? (
        <p>Henüz hiç biletiniz yok. Etkinliklere göz atın!</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              style={{
                border: "1px solid #ddd",
                padding: "1.5rem",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            >
              <h3>Bilet ID: {ticket.id}</h3>
              <p>
                <strong>Etkinlik ID:</strong> {ticket.eventId}
              </p>
              <p>
                <strong>Satın Alma Tarihi:</strong>{" "}
                {new Date(ticket.purchaseDate).toLocaleDateString("tr-TR")}
              </p>
              <p>
                <strong>Durum:</strong>
                <span
                  style={{
                    color: ticket.isUsed ? "red" : "green",
                    marginLeft: "0.5rem",
                  }}
                >
                  {ticket.isUsed ? "Kullanıldı" : "Aktif"}
                </span>
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#666",
                  marginTop: "0.5rem",
                }}
              >
                QR Kod: {ticket.qrCodeGuid}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTicketsPage;
