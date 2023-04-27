import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeNav from "./HomeNav";

import TripNav from "./TripNav";
const Tab = createBottomTabNavigator();

const TabNav = ({ route, navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "map" : "map-sharp";
          } else if (route.name === "TripTab") {
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
        name="TripTab"
        component={TripNav}
        options={{ headerShown: false }}
        initialParams={{ email: route.params.email }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
