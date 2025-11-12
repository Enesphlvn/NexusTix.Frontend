import type { ServiceResult } from "../../models/ServiceResult";
import type { CreateTicketRequest } from "../../models/Ticket/Requests/CreateTicketRequest";
import type { TicketResponse } from "../../models/Ticket/Responses/TicketResponse";
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

export const createTicket = async (
  request: CreateTicketRequest
): Promise<TicketResponse> => {
  const response = await api.post<ServiceResult<TicketResponse>>(
    "/tickets",
    request
  );

  if (!response.data.isSuccess) {
    throw new Error(response.data.errorMessages.join(", "));
  }

  return response.data.data;
};

export const getMyTickets = async (): Promise<TicketResponse[]> => {
  const response = await api.get<ServiceResult<TicketResponse[]>>(
    "/tickets/me"
  );

  if (!response.data.isSuccess) {
    throw new Error(response.data.errorMessages.join(", "));
  }

  return response.data.data;
};
