import type { ServiceResult } from "../../models/ServiceResult";
import type { UpdateUserRequest } from "../../models/User/Requests/UpdateUserRequest";
import type { UpdateUserRoleRequest } from "../../models/User/Requests/UpdateUserRoleRequest";
import type { UserResponse } from "../../models/User/Responses/UserResponse";
import api from "../api";

export const getMyProfile = async (): Promise<UserResponse> => {
  const response = await api.get<ServiceResult<UserResponse>>("/users/me");

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));

  return response.data.data;
};

export const updateProfile = async (
  request: UpdateUserRequest
): Promise<void> => {
  const response = await api.put<ServiceResult<null>>(`/users/me`, request);

  if (response.status === 204) return;

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));
};

export const getAllUsers = async (): Promise<UserResponse[]> => {
  const response = await api.get<ServiceResult<UserResponse[]>>('/users');

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));

  return response.data.data;
}

export const updateRole = async (request: UpdateUserRoleRequest): Promise<void> => {
  const response = await api.put<ServiceResult<null>>(`/users/${request.id}/role`, request);

  if (response.status === 204) return;

  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));
}

export const passiveUser = async (id:number): Promise<void> => {
  const response = await api.patch<ServiceResult<null>>(`/users/${id}/passive`);

  if (response.status === 204) return;
  
  if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));
}