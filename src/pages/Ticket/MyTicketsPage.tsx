import { useMyTickets } from "../../hooks/Ticket/useMyTickets";
import TicketCard from "../../components/Ticket/TicketCard";
import styles from "./MyTicketsPage.module.css";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

const MyTicketsPage = () => {
  const { tickets, loading, error, refetch } = useMyTickets();

  if (loading) return <LoadingSpinner />;
  if (error) return <div style={{ color: "red" }}>Hata: {error}</div>;

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.header}>Biletlerim</h1>

      {tickets.length === 0 ? (
        <p className={styles.emptyState}>
          Henüz hiç biletiniz yok. Etkinliklere göz atın!
        </p>
      ) : (
        <div className={styles.ticketList}>
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} onRefresh={refetch} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTicketsPage;
