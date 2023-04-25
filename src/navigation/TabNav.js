import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeNav from "./HomeNav";
import TripScreen from "../screens/TripScreen";
const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "map" : "map-sharp";
          } else if (route.name === "Trip") {
            iconName = focused ? "home" : "settings";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNav}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Trip"
        component={TripScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
