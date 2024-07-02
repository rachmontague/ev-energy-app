import axios from 'axios';
import { POI } from '../types/poi';

// Fetch POIs from OpenChargeMap API
export const fetchPOIs = async (latitude: number, longitude: number, apiKey: string): Promise<POI[]> => {
  try {
    const response = await axios.get('https://api.openchargemap.io/v3/poi', {
      params: {
        output: 'json',
        key: apiKey,
        maxresults: 25,
        compact: true,
        latitude,
        longitude,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch POIs');
  }
};

// Start charging session
export const startCharging = async (userId: number, carId: number, chargerId: string): Promise<void> => {
  try {
    const response = await axios.post('https://example.ev.energy/chargingsession', {
      user: userId,
      car_id: carId,
      charger_id: chargerId,
    });

    if (response.status === 200) {
      console.log('Charging started successfully');
    } else {
      throw new Error('Failed to start charging');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to start charging');
  }
};
