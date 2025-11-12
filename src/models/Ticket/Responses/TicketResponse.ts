export interface TicketResponse {
  id: number;
  eventId: number;
  userId: number;
  qrCodeGuid: string;
  purchaseDate: string;
  isUsed: boolean;
}
