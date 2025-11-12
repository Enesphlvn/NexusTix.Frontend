import { useNavigate, useParams } from "react-router-dom";
import { useEvent } from "../../hooks/Event/useEvent";
import { useAuth } from "../../context/AuthContext";
import EventDetail from "../../components/Event/EventDetail";
import { toast } from "react-toastify";

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { event, loading, error } = useEvent(id);
  const { isAuthenticated } = useAuth();

  const handleBuyClick = () => {
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

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div style={{ color: "red" }}>Hata: {error}</div>;
  if (!event) return <div>Etkinlik bulunamadı.</div>;

  return <EventDetail event={event} onBuyClick={handleBuyClick} />;
};

export default EventDetailPage;
