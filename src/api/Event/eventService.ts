import type { EventResponse } from "../../models/Event/Responses/EventResponse";
import type { EventAggregateResponse } from "../../models/Event/Responses/EventAggregateResponse";
import type { EventFiltersRequest } from "../../models/Event/Requests/EventFiltersRequest";
import type { ServiceResult } from "../../models/ServiceResult";
import api from "../api";
import type { EventAdminResponse } from "../../models/Event/Responses/EventAdminResponse";
import type { CreateEventRequest } from "../../models/Event/Requests/CreateEventRequest";
import type { UpdateEventRequest } from "../../models/Event/Requests/UpdateEventRequest";
import type { EventListResponse } from "../../models/Event/Responses/EventListResponse";

export const getAllEvents = async (): Promise<EventResponse[]> => {
  const response = await api.get<ServiceResult<EventResponse[]>>("/events");

  if (!response.data.isSuccess)
    throw new Error(response.data.errorMessages.join(", "));

  return response.data.data;
};

export const getFilteredEvents = async (
  filters: EventFiltersRequest
): Promise<EventListResponse[]> => {
  const response = await api.get<ServiceResult<EventListResponse[]>>(
    "/events/filter",
    {
      params: filters,
    }
  );

  if (!response.data.isSuccess)
    throw new Error(response.data.errorMessages.join(", "));

  return response.data.data;
};

export const getEventAggregate = async (id: number): Promise<EventAggregateResponse> => {
  const response = await api.get<ServiceResult<EventAggregateResponse>>(`/events/${id}/aggregate`);

  if (!response.data.isSuccess)
    throw new Error(response.data.errorMessages.join(", "));

  return response.data.data;
};

export const deleteEvent = async (id: number): Promise<void> => {
  const response = await api.delete<ServiceResult<null>>(`/events/${id}`);

  if (response.status === 204) return;

  if (!response.data.isSuccess)
    throw new Error(response.data.errorMessages.join(", "));
};

export const getEventsForAdmin = async (): Promise<EventAdminResponse[]> => {
  const response = await api.get<ServiceResult<EventAdminResponse[]>>("/events/admin-list");

  if (!response.data.isSuccess)
    throw new Error(response.data.errorMessages.join(", "));

  return response.data.data!;
};

export const createEvent = async (
  request: CreateEventRequest
): Promise<EventResponse> => {
  const response = await api.post<ServiceResult<EventResponse>>(
    "/events",
    request
  );

  if (!response.data.isSuccess)
    throw new Error(response.data.errorMessages.join(", "));

  return response.data.data!;
};

export const updateEvent = async (
  request: UpdateEventRequest
): Promise<void> => {
  const response = await api.put<ServiceResult<null>>(
    `/events/${request.id}`,
    request
  );

  if (response.status === 204) return;

  if (!response.data.isSuccess)
    throw new Error(response.data.errorMessages.join(", "));
};

export const getEventById = async (id: number): Promise<EventResponse> => {
  const response = await api.get<ServiceResult<EventResponse>>(`/events/${id}`);

  if (!response.data.isSuccess)
    throw new Error(response.data.errorMessages.join(", "));

  return response.data.data!;
};

export const passiveEvent = async (id: number): Promise<void> => {
  const response = await api.patch<ServiceResult<null>>(
    `/events/${id}/passive`
  );

  if (response.status === 204) return;

  if (!response.data.isSuccess)
    throw new Error(response.data.errorMessages.join(", "));
};
