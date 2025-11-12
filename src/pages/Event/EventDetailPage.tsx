import { useNavigate, useParams } from "react-router-dom";
import { useEvent } from "../../hooks/Event/useEvent";
import { useAuth } from "../../context/AuthContext";
import EventDetail from "../../components/Event/EventDetail";

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { event, loading, error } = useEvent(id);

  const { isAuthenticated } = useAuth();

  const handleBuyClick = () => {
    if (!isAuthenticated) {
      if (
        confirm(
          "Bilet almak için giriş yapmanız gerekmektedir. Giriş sayfasına yönlendirilsin mi?"
        )
      ) {
        navigate("/login");
      }
    } else {
      console.log("Ödeme sayfasına gidiliyor...");
    }
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div style={{ color: "red" }}>Hata: {error}</div>;
  if (!event) return <div>Etkinlik bulunamadı.</div>;

  return <EventDetail event={event} onBuyClick={handleBuyClick} />;
};

export default EventDetailPage;
