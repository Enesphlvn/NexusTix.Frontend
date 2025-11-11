export interface UpdateUserEmailRequest {
  id: number;
  newEmail: string;
  currentPassword: string;
}
