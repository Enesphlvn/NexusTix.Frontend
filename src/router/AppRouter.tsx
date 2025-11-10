import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import CitiesPage from "../pages/City/CitiesPage";
import CityDetailPage from "../pages/City/CityDetailPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>

        <Route path="/cities" element={<CitiesPage />}></Route>
        <Route path="/cities/:id" element={<CityDetailPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
