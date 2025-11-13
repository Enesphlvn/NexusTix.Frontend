import { BrowserRouter, Route, Routes } from "react-router-dom";
import CitiesPage from "../pages/City/CitiesPage";
import CityDetailPage from "../pages/City/CityDetailPage";
import MainLayout from "../components/Layout/MainLayout";
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import EventDetailPage from "../pages/Event/EventDetailPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import MyTicketsPage from "../pages/Ticket/MyTicketsPage";
import MyProfilePage from "../pages/User/MyProfilePage";
import ProtectedRoute from "./ProtectedRoute";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="events/:id" element={<EventDetailPage />} />
          <Route path="cities" element={<CitiesPage />} />
          <Route path="cities/:id" element={<CityDetailPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="my-tickets" element={<MyTicketsPage />} />
            <Route path="profile" element={<MyProfilePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
