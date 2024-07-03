export interface POI {
    ID: number;
    NumberOfPoints: string;
    UsageCost: string;
    AddressInfo: {
      Title: string;
      AddressLine1: string;
      AddressLine2: string;
      Town: string;
      Distance: number;
      Latitude: number;
      Longitude: number;
    };
  }
  
  export interface DetailsRouteParams {
    poi: POI;
  }