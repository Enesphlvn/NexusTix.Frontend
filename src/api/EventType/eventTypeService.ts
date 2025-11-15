import type { EventTypeResponse } from "../../models/EventType/Responses/EventTypeResponse";
import type { ServiceResult } from "../../models/ServiceResult";
import api from "../api";

export const getAllEventTypes = async (): Promise<EventTypeResponse[]> => {
  const response = await api.get<ServiceResult<EventTypeResponse[]>>("/eventtypes");

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));

  return response.data.data;
};
