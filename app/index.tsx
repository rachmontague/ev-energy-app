import { View, StyleSheet, ActivityIndicator } from "react-native";

import * as Location from 'expo-location';
import { useEffect, useState } from "react";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";

interface POI {
  ID: number;
  AddressInfo: {
    Title: string;
    Latitude: number;
    Longitude: number;
  };
}

export default function Index() {

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [pois, setPois] = useState<POI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (!!location) {
      fetchData();
    }
  }, [location]);

  const fetchData = async () => {
    try {
      const response = await axios.get<POI[]>('https://api.openchargemap.io/v3/poi', {
        params: {
          output: 'json',
          key: process.env.API_KEY,
          maxresults: 10,
          compact: true,
          latitude: location?.coords.latitude,
          longitude: location?.coords.longitude
        },
      });
      setPois(response.data);
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
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        initialRegion={{
          latitude: location?.coords.latitude || 0,
          longitude: location?.coords.longitude || 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {pois.map((poi) => (
          <Marker
            key={poi.ID}
            coordinate={{
              latitude: poi.AddressInfo.Latitude,
              longitude: poi.AddressInfo.Longitude,
            }}
            title={poi.AddressInfo.Title}
          />
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
});
