import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { CreateUserRequest } from "../../models/Auth/Requests/CreateUserRequest";
import { register } from "../../api/Auth/authService";

export const useRegister = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName || !lastName || !email || !password) {
      setError("Tüm zorunlu alanlar doldurulmalıdır.");
      return;
    }

    try {
      setLoading(true);
      const request: CreateUserRequest = {
        firstName,
        lastName,
        email,
        password,
        phoneNumber: phoneNumber || null,
      };

      await register(request);

      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Kayıt işlemi başarısız.");
    } finally {
      setLoading(false);
    }
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    error,
    loading,
    handleSubmit,
  };
};
