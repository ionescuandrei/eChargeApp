import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import MapScreen from "../screens/MapScreen";
import AccountScreen from "../screens/Drawer/AddCar";
import AddCarScreen from "../screens/Drawer/AddCar";

const Tab = createBottomTabNavigator();

import React from "react";

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "map" : "map-sharp";
          } else if (route.name === "Settings") {
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
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="AddCarScreen"
        component={AddCarScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
