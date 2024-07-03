import axios from 'axios';
import { POI } from '../types';
import { ENDPOINTS } from '../constants';

// Fetch POIs from OpenChargeMap API
export const fetchPOIs = async (latitude: number, longitude: number, apiKey: string): Promise<POI[]> => {
  try {
    const response = await axios.get(`${ENDPOINTS.OPENCHARGE}/poi`, {
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
export const startCharging = async (userId: number, carId: number, chargerId: number): Promise<void> => {

  console.log(userId, carId, chargerId);
  try {
    const response = await axios.post(`${ENDPOINTS.EV_ENERGY}/chargingsession`, {
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
