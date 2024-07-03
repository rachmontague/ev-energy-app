import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types/navigation';
import { startCharging } from './services/api';

// Define the type for the route prop
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface DetailsProps {
  route: DetailsScreenRouteProp;
}

export default function Details({ route }: DetailsProps) {
  const { poi } = route.params;

  console.log(poi);

  // Function to handle the start charging button press
  const handleStartCharging = async () => {
    try {
      await startCharging(1, 1, poi.ID);
      Alert.alert('Charging started successfully!');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Failed to start charging', error.message);
      } else {
        Alert.alert('Failed to start charging', 'An unknown error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{poi.AddressInfo.Title}</Text>
      <Text>ID:{poi.ID}</Text>
      <Text>Address Line 1: {poi.AddressInfo.AddressLine1}</Text>
      <Text>Town: {poi.AddressInfo.Town}</Text>
      <Text>Distance: {poi.AddressInfo.Distance.toFixed(2)} miles</Text>
      <Text>Latitude: {poi.AddressInfo.Latitude}</Text>
      <Text>Longitude: {poi.AddressInfo.Longitude}</Text>
      <Text>Number of Points: {poi.NumberOfPoints}</Text>
      <Text>Usage Cost: {poi.UsageCost}</Text>
      <Button title="Start Charging" onPress={handleStartCharging} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
