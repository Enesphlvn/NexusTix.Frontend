import { useState, type FormEvent } from "react";
import { forgotPassword } from "../../api/Auth/authService";
import { toast } from "react-toastify";

export const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await forgotPassword({ email });

      console.log("Reset Token:", token);

      toast.success("Sıfırlama bağlantısı e-posta adresinize gönderildi.");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, loading, handleSubmit };
};
