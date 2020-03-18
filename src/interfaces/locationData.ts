export interface ILocation {
  address_components: ILocationAdressComponent[];
  formatted_address: string;
  geometry: ILocationGeometry;
  place_id: string;
  types: string[];
}

export interface ICoords {
  lat: number;
  lng: number;
}

interface ILocationAdressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface ILocationGeometry {
  bounds: ILocationGeometryBounds;
  location: ICoords;
  location_type: string;
  viewport: ILocationGeometryBounds;
}

interface ILocationGeometryBounds {
  northeast: ICoords;
  southwest: ICoords;
}
