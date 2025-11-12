import type { EventResponse } from "../../models/Event/Responses/EventResponse";
import type { EventAggregateResponse } from "../../models/Event/Responses/EventAggregateResponse";
import type { EventFiltersResponse } from "../../models/Event/Responses/EventFiltersResponse";
import type { ServiceResult } from "../../models/ServiceResult";
import api from "../api";

export const getAllEvents = async (): Promise<EventResponse[]> => {
  const response = await api.get<ServiceResult<EventResponse[]>>("/events");

  if (!response.data.isSuccess) {
    throw new Error(response.data.errorMessages.join(", "));
  }

  return response.data.data;
};

export const getFilteredEvents = async (
  filters: EventFiltersResponse
): Promise<EventResponse[]> => {
  const response = await api.get<ServiceResult<EventResponse[]>>("/events/filter", {
    params: filters,
  });

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
