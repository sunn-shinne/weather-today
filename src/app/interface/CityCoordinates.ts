export interface CityCoordinates{
  name: string;
  local_names: LocalNames;
  lat: number; // Geographical coordinates of the found location (latitude)
  lon: number; // Geographical coordinates of the found location (longitude)
  country: string;
  state?: string
}

export interface LocalNames{
  ascii?: string;
  feature_name?: string;
  local_names?: any;
}