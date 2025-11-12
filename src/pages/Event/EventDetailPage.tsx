import { useNavigate, useParams } from "react-router-dom";
import { useEvent } from "../../hooks/Event/useEvent";
import { useAuth } from "../../context/AuthContext";
import EventDetail from "../../components/Event/EventDetail";
import { toast } from "react-toastify";
import { useTicketCount } from "../../hooks/Ticket/useTicketCount";

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { event, loading: eventLoading, error } = useEvent(id);
  const { soldCount, loading: countLoading } = useTicketCount(
    id ? Number(id) : undefined
  );
  const { isAuthenticated } = useAuth();

  const isLoading = eventLoading || countLoading;

  const isSoldOut = event && soldCount !== null && soldCount >= event.capacity;

  const handleBuyClick = () => {
    if (isSoldOut) {
      toast.error("Üzgünüz, bu etkinlik için biletler tükendi! 😔", {
        position: "top-right",
        theme: "colored",
      });

      return;
    }

    if (!isAuthenticated) {
      toast.info(
        "Bilet almak için lütfen önce giriş yapınız. Yönlendiriliyorsunuz...",
        {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      toast.success("Ödeme adımına geçiliyor! 🚀");
      console.log("Ödeme sayfasına gidiliyor...");
    }
  };

  if (isLoading) return <div>Yükleniyor...</div>;
  if (error) return <div style={{ color: "red" }}>Hata: {error}</div>;
  if (!event) return <div>Etkinlik bulunamadı.</div>;

  return (
    <EventDetail
      event={event}
      onBuyClick={handleBuyClick}
      soldCount={soldCount}
      isSoldOut={isSoldOut}
    />
  );
};

export default EventDetailPage;
