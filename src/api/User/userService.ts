import type { ServiceResult } from "../../models/ServiceResult";
import type { UpdateUserRequest } from "../../models/User/Requests/UpdateUserRequest";
import type { UserResponse } from "../../models/User/Responses/UserResponse";
import api from "../api";

export const getMyProfile = async (): Promise<UserResponse> => {
  const response = await api.get<ServiceResult<UserResponse>>("/users/me");

  if (!response.data.isSuccess) {
    throw new Error(response.data.errorMessages.join(", "));
  }

  return response.data.data;
};

export const updateProfile = async (
  request: UpdateUserRequest
): Promise<void> => {
  const response = await api.put<ServiceResult<null>>(`/users/me`, request);

  if (response.status === 204) {
    return;
  }

  if (response.data && !response.data.isSuccess) {
    const errorMessage =
      response.data.errorMessages?.join(", ") ||
      "Profil güncellenirken bilinmeyen bir hata oluştu.";
    throw new Error(errorMessage);
  }
};
