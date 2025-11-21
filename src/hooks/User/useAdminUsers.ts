import { useCallback, useEffect, useState } from "react";
import {
  getAllUsersForAdmin,
  passiveUser,
  updateRole,
} from "../../api/User/userService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import type { UserAdminResponse } from "../../models/User/Responses/UserAdminResponse";

export const useAdminUsers = () => {
  const [users, setUsers] = useState<UserAdminResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllUsersForAdmin();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Kullanıcılar yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (id: number, newRole: string) => {
    try {
      await updateRole({ id, newRoleName: newRole });
      toast.success("Kullanıcı rolü güncellendi.");
      fetchUsers();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handlePassive = async (id: number, isActive: boolean) => {
    const actionText = isActive ? "Pasife" : "Aktife";
    const descriptionText = isActive
      ? "Bu kullanıcı sisteme giriş yapamayacak."
      : "Bu kullanıcı tekrar sisteme giriş yapabilecek.";
    const confirmColor = isActive ? "#d33" : "#28a745";

    const result = await Swal.fire({
      title: `Kullanıcıyı ${actionText} Al?`,
      text: descriptionText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: confirmColor,
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Evet, ${actionText} Al`,
      cancelButtonText: "Vazgeç",
    });

    if (result.isConfirmed) {
      try {
        await passiveUser(id);

        toast.success(
          `Kullanıcı başarıyla ${actionText.toLowerCase()} alındı.`
        );
        fetchUsers();
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

  return { users, loading, error, handleRoleChange, handlePassive };
};
