import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './index';
import Details from './Details';
import { RootStackParamList } from './types';

// Create a stack navigator with types defined in RootStackParamList
const Stack = createStackNavigator<RootStackParamList>();

export default function Layout() {
  return (
    <Stack.Navigator initialRouteName="index">
      <Stack.Screen name="index" component={Index} options={{title: 'Home'}}/>
      <Stack.Screen name="Details" component={Details} options={{title: 'Detail'}}  />
    </Stack.Navigator>
  );
}
