export interface EventListResponse {
  id: number;
  name: string;
  date: string;
  price: number;
  description: string | null;
  capacity: number;
  eventTypeId: number;
  venueId: number;
  eventTypeName: string;
  venueName: string;
  districtName: string;
  cityName: string;
  artistNames: string[];
}
