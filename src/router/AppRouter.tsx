import { BrowserRouter, Route, Routes } from "react-router-dom";
import CitiesPage from "../pages/City/CitiesPage";
import CityDetailPage from "../pages/City/CityDetailPage";
import HomePage from "../pages/Home/HomePage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        <Route path="/cities" element={<CitiesPage />}></Route>
        <Route path="/cities/:id" element={<CityDetailPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
