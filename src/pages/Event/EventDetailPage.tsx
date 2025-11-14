import { useParams } from "react-router-dom";
import { useEvent } from "../../hooks/Event/useEvent";
import EventDetail from "../../components/Event/EventDetail";
import { useTicketCount } from "../../hooks/Ticket/useTicketCount";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import { useEventPurchase } from "../../hooks/Event/useEventPurchase";
import ErrorMessage from "../../components/Common/ErrorMessage";

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { event, loading: eventLoading, error } = useEvent(id);
  const { soldCount, loading: countLoading } = useTicketCount(
    id ? Number(id) : undefined
  );

  const { handleBuyTicket } = useEventPurchase();

  const isLoading = eventLoading || countLoading;
  const isSoldOut = event && soldCount !== null && soldCount >= event.capacity;

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!event) return <div>Etkinlik bulunamadı.</div>;

  return (
    <EventDetail
      event={event}
      onBuyClick={() => handleBuyTicket(event, isSoldOut)}
      soldCount={soldCount}
      isSoldOut={isSoldOut}
    />
  );
};

export default EventDetailPage;
