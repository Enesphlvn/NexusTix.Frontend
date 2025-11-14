import type { EventResponse } from "../../models/Event/Responses/EventResponse";
import type { EventAggregateResponse } from "../../models/Event/Responses/EventAggregateResponse";
import type { EventFiltersRequest } from "../../models/Event/Requests/EventFiltersRequest";
import type { ServiceResult } from "../../models/ServiceResult";
import api from "../api";
import type { EventAdminResponse } from "../../models/Event/Responses/EventAdminResponse";

export const getAllEvents = async (): Promise<EventResponse[]> => {
  const response = await api.get<ServiceResult<EventResponse[]>>("/events");

  if (!response.data.isSuccess) {
    throw new Error(response.data.errorMessages.join(", "));
  }

  return response.data.data;
};

export const getFilteredEvents = async (
  filters: EventFiltersRequest
): Promise<EventResponse[]> => {
  const response = await api.get<ServiceResult<EventResponse[]>>(
    "/events/filter",
    {
      params: filters,
    }
  );

  if (!response.data.isSuccess) {
    throw new Error(response.data.errorMessages.join(", "));
  }

  return response.data.data;
};

export const getEvent = async (id: number): Promise<EventAggregateResponse> => {
  const response = await api.get<ServiceResult<EventAggregateResponse>>(
    `/events/${id}/aggregate`
  );

  if (!response.data.isSuccess) {
    throw new Error(response.data.errorMessages.join(", "));
  }

  return response.data.data;
};

export const deleteEvent = async (id: number): Promise<void> => {
  const response = await api.delete<ServiceResult<null>>(`/events/${id}`);

  if (response.status === 204) return;

  if (!response.data.isSuccess) {
    throw new Error(response.data.errorMessages.join(", "));
  }
};

export const getEventsForAdmin = async (): Promise<EventAdminResponse[]> => {
  const response = await api.get<ServiceResult<EventAdminResponse[]>>(
    "/events/admin-list"
  );

  if (!response.data.isSuccess) {
    throw new Error(response.data.errorMessages.join(", "));
  }

  return response.data.data!;
};
