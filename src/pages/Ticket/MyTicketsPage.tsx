import { useMyTickets } from "../../hooks/Ticket/useMyTickets";
import styles from "../../components/Ticket/TicketList.module.css";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import ErrorMessage from "../../components/Common/ErrorMessage";
import TicketList from "../../components/Ticket/TicketList";

const MyTicketsPage = () => {
  const { tickets, loading, error, refetch } = useMyTickets();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.header}>Biletlerim</h1>

      <TicketList tickets={tickets} onRefresh={refetch} />
    </div>
  );
};

export default MyTicketsPage;
