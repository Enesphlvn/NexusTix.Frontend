import type { Event } from "../../models/Event/Event";
import type { EventFilters } from "../../models/Event/EventFilters";
import type { ServiceResult } from "../../models/ServiceResult";
import api from "../api";

export const getAllEvents = async (): Promise<Event[]> => {
  const response = await api.get<ServiceResult<Event[]>>("/events");

  if (!response.data.isSuccess) {
    throw new Error(response.data.errorMessages.join(", "));
  }

  return response.data.data;
};

export const getFilteredEvents = async (
  filters: EventFilters
): Promise<Event[]> => {
  const response = await api.get<ServiceResult<Event[]>>("/events/filter", {
    params: filters,
  });

  if (!response.data.isSuccess) {
    throw new Error(response.data.errorMessages.join(", "));
  }

  return response.data.data;
};
