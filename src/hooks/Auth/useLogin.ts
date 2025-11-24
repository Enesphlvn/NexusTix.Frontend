import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useState, type FormEvent } from "react";
import type { LoginRequest } from "../../models/Auth/Requests/LoginRequest";

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("E-posta ve şifre alanları zorunludur.");
      return;
    }

    try {
      setLoading(true);
      const request: LoginRequest = { email, password };
      await login(request);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Giriş işlemi başarısız.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  };
};
