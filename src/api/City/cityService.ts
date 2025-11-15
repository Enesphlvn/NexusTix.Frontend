import type { CityResponse } from "../../models/City/Responses/CityResponse";
import type { ServiceResult } from "../../models/ServiceResult";
import api from "../api";

export const getAllCities = async (): Promise<CityResponse[]> => {
  const response = await api.get<ServiceResult<CityResponse[]>>("/cities");

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));

  return response.data.data;
};

export const getCity = async (id: number): Promise<CityResponse> => {
  const response = await api.get<ServiceResult<CityResponse>>(`/cities/${id}`);

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));

  return response.data.data;
};
