import Swal from "sweetalert2";
import { deleteEvent } from "../../api/Event/eventService";
import { toast } from "react-toastify";

export const useDeleteEvent = (onSuccess: () => void) => {
  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Emin misiniz?",
      text: "Bu etkinlik kalıcı olarak silinecektir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Evet, Sil!",
      cancelButtonText: "Vazgeç",
    });

    if (result.isConfirmed) {
      try {
        await deleteEvent(id);
        toast.success("Etkinlik başarıyla silindi.");
        onSuccess();
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

  return { handleDelete };
};
