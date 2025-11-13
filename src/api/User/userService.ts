import type { ServiceResult } from "../../models/ServiceResult";
import type { UserResponse } from "../../models/User/Responses/UserResponse";
import api from "../api";

export const getMyProfile = async (): Promise<UserResponse> => {
  const response = await api.get<ServiceResult<UserResponse>>("/users/me");

  if (!response.data.isSuccess) {
    throw new Error(response.data.errorMessages.join(", "));
  }

  return response.data.data;
};
