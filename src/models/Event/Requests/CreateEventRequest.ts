export interface CreateEventRequest {
  name: string;
  date: string;
  price: number;
  description: string | null;
  capacity: number;
  eventTypeId: number;
  venueId: number;
}
