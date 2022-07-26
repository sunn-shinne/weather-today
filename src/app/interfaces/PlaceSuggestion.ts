export interface PlaceSuggestion {
  city: string;
  fullAddress: string;
  cords: {
    lon: number;
    lat: number;
  };
}
