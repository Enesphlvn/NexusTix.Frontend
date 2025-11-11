import type { City } from "../../models/City/Responses/City";
import type { ServiceResult } from "../../models/ServiceResult";
import api from "../api";

export const getAllCities = async (): Promise<City[]> => {
  const response = await api.get<ServiceResult<City[]>>("/cities");

  if (!response.data.isSuccess) {
    throw new Error(response.data.errorMessages.join(", "));
  }

  return response.data.data;
};

export const getCity = async (id: number): Promise<City> => {
  const response = await api.get<ServiceResult<City>>(`/cities/${id}`);

  if (!response.data.isSuccess) {
    throw new Error(response.data.errorMessages.join(", "));
  }

  return response.data.data;
};
