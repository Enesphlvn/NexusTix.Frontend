export interface EventAdminResponse {
  id: number;
  name: string;
  date: string;
  price: number;
  description: string | null;
  capacity: number;
  eventTypeId: number;
  eventTypeName: string;
  venueId: number;
  venueName: string;
  artistNames: string[];
}
