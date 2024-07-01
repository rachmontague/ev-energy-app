export interface POI {
    ID: number;
    AddressInfo: {
      Title: string;
      Latitude: number;
      Longitude: number;
    };
  }
  
  export interface DetailsRouteParams {
    poi: POI;
  }