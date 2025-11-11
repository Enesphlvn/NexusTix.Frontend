import type { CreateUserRequest } from "../../models/Auth/Requests/CreateUserRequest";
import type { LoginRequest } from "../../models/Auth/Requests/LoginRequest";
import type { UpdateUserEmailRequest } from "../../models/Auth/Requests/UpdateUserEmailRequest";
import type { UpdateUserPasswordRequest } from "../../models/Auth/Requests/UpdateUserPasswordRequest";
import type { LoginResponse } from "../../models/Auth/Responses/LoginResponse";
import type { ServiceResult } from "../../models/ServiceResult";
import type { UserResponse } from "../../models/User/Responses/UserResponse";
import api from "../api";

export const register = async (
  request: CreateUserRequest
): Promise<UserResponse> => {
  const response = await api.post<ServiceResult<UserResponse>>(
    "/auth/register",
    request
  );

  if (!response.data.isSuccess) {
    throw new Error(response.data.errorMessages.join(", "));
  }

  return response.data.data;
};

export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<ServiceResult<LoginResponse>>(
    "/auth/login",
    request
  );

  if (!response.data.isSuccess) {
    throw new Error(response.data.errorMessages.join(", "));
  }

  return response.data.data;
};

export const updateEmail = async (
  request: UpdateUserEmailRequest
): Promise<void> => {
  await api.put<ServiceResult<null>>("/auth/update-email", request);
};

export const updatePassword = async (
  request: UpdateUserPasswordRequest
): Promise<void> => {
  await api.put<ServiceResult<null>>("/auth/update-password", request);
};
