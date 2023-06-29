import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CarSearch from "../components/CarSearch";
import CarSelected from "../screens/CarSelected";

const Car = createNativeStackNavigator();
const CarNav = ({ route, navigation }) => {
  return (
    <Car.Navigator>
      <Car.Screen
        name="CarSearch"
        component={CarSearch}
        options={{ headerShown: false }}
      />
      <Car.Screen
        name="CarSelected"
        component={CarSelected}
        options={{
          title: "Select Car",
          headerStyle: {
            backgroundColor: "#009387",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        initialParams={{ email: route.params.email }}
      />
    </Car.Navigator>
  );
};

export default CarNav;
