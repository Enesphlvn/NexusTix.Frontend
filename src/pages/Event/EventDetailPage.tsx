import { useNavigate, useParams } from "react-router-dom";
import { useEvent } from "../../hooks/Event/useEvent";
import { useAuth } from "../../context/AuthContext";
import EventDetail from "../../components/Event/EventDetail";
import { toast } from "react-toastify";
import { useTicketCount } from "../../hooks/Ticket/useTicketCount";
import type { CreateTicketRequest } from "../../models/Ticket/Requests/CreateTicketRequest";
import { createTicket } from "../../api/Ticket/ticketService";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

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

  const handleBuyClick = async () => {
    if (isSoldOut) {
      toast.error("Üzgünüz, bu etkinlik için biletler tükendi! 😔");
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
      if (!event) return;

      try {
        const result = await Swal.fire({
          title: "Bilet Satın Al",
          html: `
            <div style="text-align: left; font-size: 1.1rem;">
              <p><strong>Etkinlik:</strong> ${event.name}</p>
              <p><strong>Tarih:</strong> ${new Date(
                event.date
              ).toLocaleDateString("tr-TR")}</p>
              <p><strong>Tutar:</strong> <span style="color: #007bff; font-weight: bold;">${
                event.price
              } TL</span></p>
              <br/>
              <p>Onaylıyor musunuz?</p>
            </div>
          `,
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#28a745",
          cancelButtonColor: "#d33",
          confirmButtonText: "Evet, Satın Al!",
          cancelButtonText: "Vazgeç",
          reverseButtons: true,
        });

        if (!result.isConfirmed) {
          return;
        }

        const request: CreateTicketRequest = { eventId: event.id };

        await createTicket(request);

        toast.success(
          "Biletiniz başarıyla oluşturuldu! 🎉 Yönlendiriliyorsunuz...",
          {
            position: "top-center",
            autoClose: 2000,
            theme: "colored",
          }
        );

        setTimeout(() => {
          navigate("/my-tickets");
        }, 2000);
      } catch (error: any) {
        toast.error(error.message || "Satın alma işlemi başarısız oldu.", {
          position: "top-right",
        });
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;
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
