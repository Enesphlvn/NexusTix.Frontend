import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../components/Layout/Main/MainLayout";
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import EventDetailPage from "../pages/Event/EventDetailPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import MyTicketsPage from "../pages/Ticket/MyTicketsPage";
import MyProfilePage from "../pages/User/MyProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../components/Layout/Admin/AdminLayout";
import DashboardPage from "../pages/Admin/DashboardPage";
import AdminRoute from "./AdminRoute";
import AdminEventsPage from "../pages/Admin/Events/AdminEventsPage";
import AdminEventFormPage from "../pages/Admin/Events/AdminEventFormPage";
import AdminVenueFormPage from "../pages/Admin/Venues/AdminVenueFormPage";
import AdminVenuesPage from "../pages/Admin/Venues/AdminVenuesPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="events/:id" element={<EventDetailPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="my-tickets" element={<MyTicketsPage />} />
            <Route path="profile" element={<MyProfilePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />

            <Route path="events" element={<AdminEventsPage />} />
            <Route path="events/new" element={<AdminEventFormPage />} />
            <Route path="events/edit/:id" element={<AdminEventFormPage />} />

            <Route path="venues" element={<AdminVenuesPage />} />
            <Route path="venues/new" element={<AdminVenueFormPage />} />
            <Route path="venues/edit/:id" element={<AdminVenueFormPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
