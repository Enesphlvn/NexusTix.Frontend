import type { EventTypeResponse } from "../../EventType/Responses/EventTypeResponse";
import type { VenueResponse } from "../../Venue/Responses/VenueResponse";

export interface EventAggregateResponse {
  id: number;
  name: string;
  date: string;
  price: number;
  description: string | null;
  capacity: number;

  eventType: EventTypeResponse;
  venue: VenueResponse;
}
