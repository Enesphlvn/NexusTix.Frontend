import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { EventAggregateResponse } from "../../models/Event/Responses/EventAggregateResponse";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import type { CreateTicketRequest } from "../../models/Ticket/Requests/CreateTicketRequest";
import { createTicket } from "../../api/Ticket/ticketService";

export const useEventPurchase = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleBuyTicket = async (
    event: EventAggregateResponse,
    isSoldOut: boolean | null
  ) => {
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
          theme: "colored",
        }
      );
      setTimeout(() => navigate("/login"), 1000);
      return;
    }

    const result = await Swal.fire({
      title: "Bilet Satın Al",
      html: `
        <div style="text-align: left; font-size: 1.1rem;">
          <p><strong>Etkinlik:</strong> ${event.name}</p>
          <p><strong>Tarih:</strong> ${new Date(event.date).toLocaleDateString(
            "tr-TR"
          )}</p>
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

    if (!result.isConfirmed) return;

    try {
      const request: CreateTicketRequest = { eventId: event.id };
      await createTicket(request);

      toast.success(
        "Biletiniz başarıyla oluşturuldu! 🎉 Yönlendiriliyorsunuz...",
        { position: "top-center", autoClose: 2000, theme: "colored" }
      );

      setTimeout(() => navigate("/my-tickets"), 2000);
    } catch (error: any) {
      toast.error(error.message || "Satın alma işlemi başarısız oldu.", {
        position: "top-right",
      });
    }
  };

  return { handleBuyTicket };
};
