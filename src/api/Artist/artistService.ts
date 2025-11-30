import type { CreateArtistRequest } from "../../models/Artist/Requests/CreateArtistRequest";
import type { UpdateArtistRequest } from "../../models/Artist/Requests/UpdateArtistRequest";
import type { ArtistAdminResponse } from "../../models/Artist/Responses/ArtistAdminResponse";
import type { ArtistResponse } from "../../models/Artist/Responses/ArtistResponse";
import type { ArtistWithEventsResponse } from "../../models/Artist/Responses/ArtistWithEventsResponse";
import type { ServiceResult } from "../../models/ServiceResult";
import api from "../api";

export const getAllArtists = async (): Promise<ArtistResponse[]> => {
  const response = await api.get<ServiceResult<ArtistResponse[]>>("/artists");

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));

  return response.data.data!;
};

export const getAllArtistsForAdmin = async (): Promise<ArtistAdminResponse[]> => {
  const response = await api.get<ServiceResult<ArtistAdminResponse[]>>("/artists/admin-list");

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));
  
  return response.data.data!;
};

export const getArtistForAdmin = async (id: number): Promise<ArtistAdminResponse> => {
  const response = await api.get<ServiceResult<ArtistAdminResponse>>(`/artists/${id}/admin-edit`);
  
  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));
  
  return response.data.data!;
};

export const getArtistById = async (id: number): Promise<ArtistResponse> => {
  const response = await api.get<ServiceResult<ArtistResponse>>(`/artists/${id}`);

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));

  return response.data.data!;
};

export const getArtistWithEvents = async (id: number): Promise<ArtistWithEventsResponse> => {
  const response = await api.get<ServiceResult<ArtistWithEventsResponse>>(`/artists/${id}/events`);

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));

  return response.data.data!;
};

export const createArtist = async (request: CreateArtistRequest): Promise<ArtistResponse> => {
  const response = await api.post<ServiceResult<ArtistResponse>>("/artists", request);

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));

  return response.data.data!;
};

export const updateArtist = async (request: UpdateArtistRequest): Promise<void> => {
  const response = await api.put<ServiceResult<null>>(`/artists/${request.id}`, request);

  if (response.status === 204) return;

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));
};

export const passiveArtist = async (id: number): Promise<void> => {
  const response = await api.patch<ServiceResult<null>>(`/artists/${id}/passive`);

  if (response.status === 204) return;

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));
};