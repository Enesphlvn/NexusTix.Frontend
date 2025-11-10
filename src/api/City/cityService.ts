import type { City } from "../../models/City/City";
import type { ServiceResult } from "../../models/ServiceResult";
import api from "../api";

export const getAllCities = async (): Promise<City[]> => {
  try {
    const response = await api.get<ServiceResult<City[]>>("/cities");

    if (response.data.isSuccess) {
      return response.data.data;
    } else {
      throw new Error(response.data.errorMessages.join(", "));
    }
  } catch (error) {
    console.error("Şehirler getirilirken hata oluştu:", error);
    throw error;
  }
};

export const getCity = async (id: number): Promise<City> => {
  try {
    const response = await api.get<ServiceResult<City>>(`/cities/${id}`);

    if (response.data.isSuccess) {
      return response.data.data;
    } else {
      throw new Error(response.data.errorMessages.join(", "));
    }
  } catch (error) {
    console.error(`Şehir ID: (${id}) getirilirken hata oluştu:`, error);
    throw error;
  }
};