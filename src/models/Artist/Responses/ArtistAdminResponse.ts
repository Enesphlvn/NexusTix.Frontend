export interface ArtistAdminResponse {
  id: number;
  name: string;
  bio: string | null;
  imageUrl: string | null;
  isActive: boolean;
  created: string;
  updated: string | null;
}
