import Swal from "sweetalert2";
import { passiveVenue } from "../../api/Venue/venueService";
import { toast } from "react-toastify";

export const usePassiveVenue = (onSuccess: () => void) => {
  const handlePassive = async (id: number) => {
    const result = await Swal.fire({
      title: "Mekanı Kaldır?",
      text: "Bu mekan pasife alınacak ve listelerden kaldırılacaktır.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f0ad4e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet, Kaldır",
      cancelButtonText: "Vazgeç",
    });

    if (result.isConfirmed) {
      try {
        await passiveVenue(id);

        toast.success("Mekan başarıyla pasife alındı.");
        onSuccess();
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

  return { handlePassive };
};
