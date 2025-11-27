import type { EventListResponse } from "../../Event/Responses/EventListResponse";

export interface ArtistWithEventsResponse {
  id: number;
  name: string;
  bio: string | null;
  imageUrl: string | null;
  events: EventListResponse[];
}
