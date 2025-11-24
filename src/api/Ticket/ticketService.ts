import type { ServiceResult } from "../../models/ServiceResult";
import type { CheckInTicketRequest } from "../../models/Ticket/Requests/CheckInTicketRequest";
import type { CreateTicketRequest } from "../../models/Ticket/Requests/CreateTicketRequest";
import type { TicketByUserResponse } from "../../models/Ticket/Responses/TicketByUserResponse";
import type { TicketResponse } from "../../models/Ticket/Responses/TicketResponse";
import api from "../api";

export const getTicketCountByEvent = async (
  eventId: number
): Promise<number> => {
  const response = await api.get<ServiceResult<number>>(
    `/tickets/event/${eventId}/count`
  );

  if (!response.data.isSuccess)
    throw new Error(response.data.errorMessages.join(", "));

  return response.data.data ?? 0;
};

export const createTicket = async (
  request: CreateTicketRequest
): Promise<TicketResponse> => {
  const response = await api.post<ServiceResult<TicketResponse>>(
    "/tickets",
    request
  );

  if (!response.data.isSuccess)
    throw new Error(response.data.errorMessages.join(", "));

  return response.data.data;
};

export const getMyTickets = async (): Promise<TicketByUserResponse[]> => {
  const response = await api.get<ServiceResult<TicketByUserResponse[]>>(
    "/tickets/me"
  );

  if (!response.data.isSuccess)
    throw new Error(response.data.errorMessages.join(", "));

  return response.data.data;
};

export const cancelTicket = async (ticketId: number): Promise<void> => {
  const response = await api.put<ServiceResult<null>>(
    `/tickets/${ticketId}/cancel`,
    {}
  );

  if (response.status === 204) return;

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));
};

export const checkInTicket = async (qrCodeGuid: string, eventId: number): Promise<void> => {
  const request: CheckInTicketRequest = { qrCodeGuid, eventId };

  const response = await api.put<ServiceResult<null>>('/tickets/checkin', request);

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", ")); 
}