export interface UpdateArtistRequest {
  id: number;
  name: string;
  bio: string | null;
  imageUrl: string | null;
}
