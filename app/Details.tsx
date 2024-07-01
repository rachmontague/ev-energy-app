import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types/navigation';
import { startCharging } from './services/api';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface DetailsProps {
  route: DetailsScreenRouteProp;
}

export default function Details({ route }: DetailsProps) {
  const { poi } = route.params;

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
      <Text>Latitude: {poi.AddressInfo.Latitude}</Text>
      <Text>Longitude: {poi.AddressInfo.Longitude}</Text>
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
