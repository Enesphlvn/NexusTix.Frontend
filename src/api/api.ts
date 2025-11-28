import axios from "axios";

const API_URL = "https://localhost:7258/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("nexusTixToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.data && error.response.data.errorMessages) {
        const errorMessage = error.response.data.errorMessages.join(", ");
        return Promise.reject(new Error(errorMessage));
      }

      if (error.response.data && error.response.data.errors) {
        const validationErrors = error.response.data.errors;
        const messages = Object.values(validationErrors).flat() as string[];
        return Promise.reject(new Error(messages.join("\n")));
      }
    }

    return Promise.reject(
      new Error(
        "Beklenmedik bir hata oluştu. Lütfen ağ bağlantınızı kontrol edin veya sisteme tekrardan giriş yapın."
      )
    );
  }
);

export default api;
