export interface LoginResponse {
  token: string;
  expiration: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}
