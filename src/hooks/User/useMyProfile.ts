import { useEffect, useState } from "react";
import type { UserResponse } from "../../models/User/Responses/UserResponse";
import { getMyProfile } from "../../api/User/userService";

export const useMyProfile = () => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getMyProfile();
        setUser(data);
      } catch (err: any) {
        setError(err.message || "Profil bilgileri yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { user, loading, error };
};
