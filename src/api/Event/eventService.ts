import type { Event } from "../../models/Event/Event";
import type { ServiceResult } from "../../models/ServiceResult";
import api from "../api";

export const getAllEvents = async (): Promise<Event[]> => {
  try {
    const response = await api.get<ServiceResult<Event[]>>("/events");
    if (response.data.isSuccess) {
      return response.data.data;
    } else {
      throw new Error(response.data.errorMessages.join(", "));
    }
  } catch (error) {
    console.error("Etkinlikler getirilirken hata oluştu:", error);
    throw error;
  }
};
