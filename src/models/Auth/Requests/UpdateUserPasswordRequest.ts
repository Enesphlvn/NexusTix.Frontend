export interface UpdateUserPasswordRequest {
  id: number;
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}
