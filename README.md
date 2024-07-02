# EV Energy App

## Project Description

A simple mobile app that allows users to view surrounding public charging stations, select one to charge at, and send a request to a backend API to start charging.

## Setup Instructions

### Prerequisites

-   Node.js
-   Expo CLI

### Installation

1.  Clone the repository:
    
    `git clone git@github.com:rachmontague/ev-energy-app.git` 
    
    ` cd ev-charging-app`
    
2.  Install dependencies

    `npm install` 
    
4.  Start the app:
    
    `npx expo start` 

### Running on a Device

To run the app on a physical device, you need to create and install a development build.

#### For Android:

`expo run:android` 

#### For iOS:

`expo run:ios` 

> **Note**: For iOS, ensure you have Xcode installed and properly configured.
    

## API Usage

### Fetching Charging Stations

The app uses the [OpenChargeMap API](https://openchargemap.org/site/develop/api#/) to fetch nearby charging stations. The `fetchPOIs` function in `services/api.ts` handles this.

### Starting a Charging Session

The app sends a POST request to `https://example.ev.energy/chargingsession` to start a charging session. The `startCharging` function in `services/api.ts` handles this.

## App Structure

### Key Files and Directories

-   `_layout.tsx`: Sets up the app's navigation with stack navigator.
-   `index.tsx`: Main screen displaying the map and markers for charging stations.
-   `Details.tsx`: Displays details of the selected charging station and includes a button to start charging.
-   `services/api.ts`: Functions to interact with the OpenChargeMap API and the backend API.
-   `types/navigation.ts`: Defines navigation types for the stack navigator.
-   `types/poi.ts`: Defines interfaces for data structures used in the app.

## How to Use the App

1.  Open the app.
2.  Allow location permissions to view nearby charging stations on the map.
3.  Select a charging station marker to view its details.
4.  Press "Start Charging" to initiate a charging session.

## Future Improvements

1.  **Error Handling**:
    
    -   Enhance error handling for API requests and provide better user feedback for failed actions.
    - Possibly add retry mechanisms
2.  **Styling**:
    
    -   Improve UI/UX design for a better user experience and ensure consistent styling throughout the app.
3.  **State Management**:
    
    -   Implement a state management library like Redux or Context API for managing global states, especially as the app scales.
4.  **Testing**:
    
    -   Add unit and integration tests for components and API interactions to ensure reliability and robustness.
5.  **Backend Integration**:
    
    -   Set up a real backend service to handle charging session requests and implement authentication and user management.
6.  **Features**:
    
    -   Favourite/recently used charging points.
    - Ability to see at a glance the availability for favourite/recently used charging points.
    - Search this area feature on the map screen.
    - Text input search functionality on the map screen.

## Conclusion

This project provides a foundation for viewing and selecting public charging stations and starting a charging session. Future improvements can enhance functionality, user experience, and robustness.