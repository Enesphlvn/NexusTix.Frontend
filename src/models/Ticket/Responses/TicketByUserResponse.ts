export interface TicketByUserResponse {
  id: number;
  qrCodeGuid: string;
  purchaseDate: string;
  isUsed: boolean;
  eventId: number;
  eventName: string;
  eventDate: string;
  venueName: string;
  cityName: string;
  isCancelled: boolean;
}
