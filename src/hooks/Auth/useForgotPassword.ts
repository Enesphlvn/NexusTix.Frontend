import { useState, type FormEvent } from "react";
import { forgotPassword } from "../../api/Auth/authService";
import { useNavigate } from "react-router-dom";

export const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = await forgotPassword({ email });

      setTimeout(() => {
        navigate(
          `/reset-password?token=${encodeURIComponent(token)}&email=${email}`
        );
      }, 1500);
    } catch (err: any) {
      setError(err.message || "İşlem başarısız oldu.");
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, loading, error, handleSubmit };
};
