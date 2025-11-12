import type { ServiceResult } from "../../models/ServiceResult";
import api from "../api";

export const getTicketCountByEvent = async (
  eventId: number
): Promise<number> => {
  const response = await api.get<ServiceResult<number>>(
    `/tickets/event/${eventId}/count`
  );

  if (!response.data.isSuccess) {
    throw new Error(response.data.errorMessages.join(", "));
  }

  return response.data.data ?? 0;
};
