export interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
  newPasswordConfirm: string;
}
