import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TripScreen from "../screens/TripScreen";
import TripMapScreen from "../screens/TripMapScreen";
import TripDetailsScreen from "../screens/TripDetailsScreen";

const Trip = createNativeStackNavigator();
const TripNav = ({ route }) => {
  return (
    <Trip.Navigator>
      <Trip.Screen
        name="TripScreen"
        component={TripScreen}
        options={{ headerShown: false }}
      />
      <Trip.Screen
        name="TripDetailsScreen"
        component={TripDetailsScreen}
        options={{ headerShown: false }}
        initialParams={{ email: route.params.email }}
      />
      <Trip.Screen
        name="TripMapScreen"
        component={TripMapScreen}
        initialParams={{ email: route.params.email }}
      />
    </Trip.Navigator>
  );
};

export default TripNav;
