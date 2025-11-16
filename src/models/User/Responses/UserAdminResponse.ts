export interface UserAdminResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  isActive: boolean;
  created: string;
  updated: string | null;
  roles: string[];
}
