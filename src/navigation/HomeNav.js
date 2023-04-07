import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EVStation from "../components/EVStation";
import MapScreen from "../screens/MapScreen";

const Home = createNativeStackNavigator();
const HomeNav = () => {
  return (
    <Home.Navigator>
      <Home.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Home.Screen name="EVStation" component={EVStation} />
    </Home.Navigator>
  );
};

export default HomeNav;
