export interface VenueAdminResponse {
  id: number;
  name: string;
  capacity: number;
  latitude: number;
  longitude: number;
  districtId: number;
  cityId: number;
  isActive: boolean;
  created: string;
  updated: string | null;
}
