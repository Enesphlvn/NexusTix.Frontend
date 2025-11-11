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
  try {
    const response = await api.post<ServiceResult<UserResponse>>(
      "/auth/register",
      request
    );

    if (response.data.isSuccess) {
      return response.data.data;
    } else {
      throw new Error(response.data.errorMessages.join(", "));
    }
  } catch (error) {
    console.error("Kayıt işlemi sırasında hata oluştu:", error);
    throw error;
  }
};

export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post<ServiceResult<LoginResponse>>(
      "/auth/login",
      request
    );

    if (response.data.isSuccess) {
      return response.data.data;
    } else {
      throw new Error(response.data.errorMessages.join(", "));
    }
  } catch (error) {
    console.error("Giriş işlemi sırasında hata oluştu:", error);
    throw error;
  }
};

export const updateEmail = async (
  request: UpdateUserEmailRequest
): Promise<void> => {
  try {
    const response = await api.put<ServiceResult<null>>(
      "/auth/update-email",
      request
    );

    if (response.data.isSuccess) {
      return;
    } else {
      throw new Error(response.data.errorMessages.join(", "));
    }
  } catch (error) {
    console.error("E-posta güncellenirken hata oluştu:", error);
    throw error;
  }
};

export const updatePassword = async (
  request: UpdateUserPasswordRequest
): Promise<void> => {
  try {
    const response = await api.put<ServiceResult<null>>(
      "/auth/update-password",
      request
    );

    if (response.data.isSuccess) {
      return;
    } else {
      throw new Error(response.data.errorMessages.join(", "));
    }
  } catch (error) {
    console.error("Şifre güncellenirken hata oluştu:", error);
    throw error;
  }
};
