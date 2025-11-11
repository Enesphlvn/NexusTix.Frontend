import type { EventType } from "../../models/EventType/Responses/EventType";
import type { ServiceResult } from "../../models/ServiceResult";
import api from "../api";

export const getAllEventTypes = async (): Promise<EventType[]> => {
  const response = await api.get<ServiceResult<EventType[]>>("/eventtypes");

  if (!response.data.isSuccess) {
    throw new Error(response.data.errorMessages.join(", "));
  }

  return response.data.data;
};
