import { useCallback, useEffect, useState } from "react";
import type { UserResponse } from "../../models/User/Responses/UserResponse";
import {
  getAllUsers,
  passiveUser,
  updateRole,
} from "../../api/User/userService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const useAdminUsers = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getAllUsers();

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

  const handlePassive = async (id: number) => {
    const result = await Swal.fire({
      title: "Kullanıcıyı Pasife Al?",
      text: "Bu kullanıcı sisteme giriş yapamayacak.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Evet, Pasife Al",
      cancelButtonText: "Vazgeç",
    });

    if (result.isConfirmed) {
      try {
        await passiveUser(id);
        toast.success("Kullanıcı pasife alındı.");
        fetchUsers();
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

  return { users, loading, error, handleRoleChange, handlePassive };
};
