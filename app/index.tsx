import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { POI } from './types/poi';
import { fetchPOIs } from './services/api';
import { RootStackParamList } from './types/navigation';

export default function Index() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [pois, setPois] = useState<POI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Request location permissions and fetch current location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    // Fetch POIs once location is available
    if (location) {
      fetchData();
    }
  }, [location]);

  const fetchData = async () => {
    try {
      const data = await fetchPOIs(
        location?.coords.latitude || 0,
        location?.coords.longitude || 0,
        'ef69c423-d871-495e-914b-99e278752fb6' // For security the API key should be stored outside of the code
      );
      setPois(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.coords.latitude || 0,
          longitude: location?.coords.longitude || 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {pois.map((poi) => (
          <Marker
            key={poi.ID}
            coordinate={{
              latitude: poi.AddressInfo.Latitude,
              longitude: poi.AddressInfo.Longitude,
            }}
          >
            <Callout onPress={() => navigation.navigate('Details', { poi })}>
              <View>
                <Text>{poi.AddressInfo.Title}</Text>
                <Text style={styles.calloutPrompt}>View details</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    marginTop: 20,
    color: 'red',
    fontSize: 16,
  },
  calloutPrompt: {
    color: 'blue',
    marginTop: 5,
  },
});
