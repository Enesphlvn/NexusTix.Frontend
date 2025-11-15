import type { ServiceResult } from "../../models/ServiceResult";
import type { VenueResponse } from "../../models/Venue/Responses/VenueResponse";
import api from "../api";

export const getAllVenues = async (): Promise<VenueResponse[]> => {
  const response = await api.get<ServiceResult<VenueResponse[]>>("/venues");
  if (!response.data.isSuccess) {
    throw new Error(response.data.errorMessages.join(", "));
  }

  return response.data.data!;
};
