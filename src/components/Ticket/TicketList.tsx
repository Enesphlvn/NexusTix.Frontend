import type { TicketByUserResponse } from "../../models/Ticket/Responses/TicketByUserResponse";
import TicketCard from "./TicketCard";
import styles from "./TicketList.module.css";

interface TicketListProps {
  tickets: TicketByUserResponse[];
  onRefresh: () => void;
}

const TicketList = ({ tickets, onRefresh }: TicketListProps) => {
  if (tickets.length === 0) {
    return (
      <p className={styles.emptyState}>
        Henüz hiç biletiniz yok. Etkinliklere göz atın!
      </p>
    );
  }

  return (
    <div className={styles.ticketList}>
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} onRefresh={onRefresh} />
      ))}
    </div>
  );
};

export default TicketList;
