import { BrowserRouter, Route, Routes } from "react-router-dom";
import CitiesPage from "../pages/City/CitiesPage";
import CityDetailPage from "../pages/City/CityDetailPage";
import MainLayout from "../components/Layout/MainLayout";
import HomePage from "../pages/Home/HomePage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="cities" element={<CitiesPage />} />
          <Route path="cities/:id" element={<CityDetailPage />} />
        </Route>{" "}
      </Routes>
    </BrowserRouter>
  );
};
