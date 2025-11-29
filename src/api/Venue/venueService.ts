import type { ServiceResult } from "../../models/ServiceResult";
import type { CreateVenueRequest } from "../../models/Venue/Requests/CreateVenueRequest";
import type { UpdateVenueRequest } from "../../models/Venue/Requests/UpdateVenueRequest";
import type { VenueAdminResponse } from "../../models/Venue/Responses/VenueAdminResponse";
import type { VenueResponse } from "../../models/Venue/Responses/VenueResponse";
import api from "../api";

export const getAllVenues = async (): Promise<VenueResponse[]> => {
  const response = await api.get<ServiceResult<VenueResponse[]>>("/venues");
  
  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));

  return response.data.data!;
};

export const getAllVenuesForAdmin = async (): Promise<VenueAdminResponse[]> => {
  const response = await api.get<ServiceResult<VenueAdminResponse[]>>("/venues/admin-list");

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));
  
  return response.data.data!;
};

export const getVenueById = async (id: number): Promise<VenueResponse> => {
  const response = await api.get<ServiceResult<VenueResponse>>(`/venues/${id}`);

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));

  return response.data.data!;
};

export const createVenue = async (request: CreateVenueRequest): Promise<VenueResponse> => {
  const response = await api.post<ServiceResult<VenueResponse>>("/venues", request);

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));
  
  return response.data.data!;
};

export const updateVenue = async (request: UpdateVenueRequest): Promise<void> => {
  const response = await api.put<ServiceResult<null>>(`/venues/${request.id}`, request);

  if (response.status === 204) return;

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));
};

export const deleteVenue = async (id: number): Promise<void> => {
  const response = await api.delete<ServiceResult<null>>(`/venues/${id}`);

  if (response.status === 204) return;
  
  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));
};

export const passiveVenue = async (id: number): Promise<void> => {
  const response = await api.patch<ServiceResult<null>>(`/venues/${id}/passive`);

  if (response.status === 204) return;

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));
};

export const getVenueForAdmin = async (id: number): Promise<VenueAdminResponse> => {
  const response = await api.get<ServiceResult<VenueAdminResponse>>(
    `/venues/${id}/admin-edit`
  );

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));

  return response.data.data!;
};