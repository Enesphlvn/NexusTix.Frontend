import Swal from "sweetalert2";
import { passiveEvent } from "../../api/Event/eventService";
import { toast } from "react-toastify";

export const usePassiveEvent = (onSuccess: () => void) => {
  const handlePassive = async (id: number) => {
    const result = await Swal.fire({
      title: "Emin misiniz?",
      text: "Bu etkinlik pasife alınacak ve listelerden kaldırılacaktır!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Evet, Sil!",
      cancelButtonText: "Vazgeç",
    });

    if (result.isConfirmed) {
      try {
        await passiveEvent(id);

        toast.success("Etkinlik başarıyla silindi.");
        onSuccess();
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

  return { handlePassive };
};
