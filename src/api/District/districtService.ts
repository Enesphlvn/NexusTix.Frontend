import type { DistrictResponse } from "../../models/District/DistrictResponse";
import type { ServiceResult } from "../../models/ServiceResult";
import api from "../api";

export const getDistrictsByCity = async (cityId: number): Promise<DistrictResponse[]> => {
  const response = await api.get<ServiceResult<DistrictResponse[]>>(`/districts/city/${cityId}`);

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));

  return response.data.data;
};
