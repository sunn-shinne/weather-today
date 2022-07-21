export interface ICityCoordinates{
  name: string;
  local_names: ILocalNames;
  lat: number; // Geographical coordinates of the found location (latitude)
  lon: number; // Geographical coordinates of the found location (longitude)
  country: string;
  state?: string
}

export interface ILocalNames{
  ascii?: string;
  feature_name?: string;
  local_names?: any;
}