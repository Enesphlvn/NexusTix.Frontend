import type { EventType } from "../../EventType/Responses/EventType";
import type { Venue } from "../../Venue/Responses/Venue";

export interface EventAggregate {
  id: number;
  name: string;
  date: string;
  price: number;
  description: string | null;
  capacity: number;

  eventType: EventType;
  venue: Venue;
}
