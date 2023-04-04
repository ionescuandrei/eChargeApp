import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SplashScreen from "../screens/SplashScreen";
import CompleteProfileScreen from "../screens/CompleteProfileScreen";
import CarUserScreen from "../screens/CarUserScreen";

const Auth = createNativeStackNavigator();
const AuthNav = () => {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="SplashScreen" component={SplashScreen} />
      <Auth.Screen name="LoginScreen" component={LoginScreen} />
      <Auth.Screen name="RegisterScreen" component={RegisterScreen} />
      <Auth.Screen
        name="CompleteProfileScreen"
        component={CompleteProfileScreen}
      />
      <Auth.Screen name="CarUserScreen" component={CarUserScreen} />
    </Auth.Navigator>
  );
};

export default AuthNav;
