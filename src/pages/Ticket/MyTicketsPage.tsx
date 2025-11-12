import { QRCodeSVG } from "qrcode.react";
import { useMyTickets } from "../../hooks/Ticket/useMyTickets";

const MyTicketsPage = () => {
  const { tickets, loading, error } = useMyTickets();

  if (loading) return <div>Biletleriniz yükleniyor...</div>;
  if (error) return <div style={{ color: "red" }}>Hata: {error}</div>;

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <h1
        style={{
          marginBottom: "2rem",
          borderBottom: "1px solid #eee",
          paddingBottom: "1rem",
        }}
      >
        Biletlerim
      </h1>

      {tickets.length === 0 ? (
        <p>Henüz hiç biletiniz yok. Etkinliklere göz atın!</p>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                backgroundColor: "#fff",
                display: "flex",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ flex: 1, padding: "1.5rem" }}>
                <h2 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>
                  {ticket.eventName}
                </h2>

                <p
                  style={{
                    color: "#555",
                    marginBottom: "0.25rem",
                    fontWeight: "600",
                  }}
                >
                  📍 {ticket.venueName}, {ticket.cityName}
                </p>

                <p style={{ color: "#666", marginBottom: "1rem" }}>
                  📅{" "}
                  {new Date(ticket.eventDate).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                <div
                  style={{
                    display: "inline-block",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    backgroundColor: ticket.isUsed ? "#ffebee" : "#e8f5e9",
                    color: ticket.isUsed ? "#c62828" : "#2e7d32",
                  }}
                >
                  {ticket.isUsed ? "Kullanıldı" : "Aktif Bilet"}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderLeft: "1px dashed #ccc",
                }}
              >
                <QRCodeSVG value={ticket.qrCodeGuid} size={100} level={"H"} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTicketsPage;
