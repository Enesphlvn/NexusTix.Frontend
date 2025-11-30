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
  isActive: boolean;
  created: string;
  updated: string | null;
  artistIds: number[];
  artistNames: string[];
}
