import { POI } from ".";

// Define navigation types for the stack navigator
export type RootStackParamList = {
  index: undefined;
  Details: { poi: POI }; // Details screen expects a POI object
};
