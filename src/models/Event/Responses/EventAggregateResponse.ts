import type { EventTypeResponse } from "../../EventType/Responses/EventTypeResponse";
import type { VenueWithLocationResponse } from "../../Venue/Responses/VenueWithLocationResponse";

export interface EventAggregateResponse {
  id: number;
  name: string;
  date: string;
  price: number;
  description: string | null;
  capacity: number;
  eventType: EventTypeResponse;
  venue: VenueWithLocationResponse;
  artistNames: string[];
}
