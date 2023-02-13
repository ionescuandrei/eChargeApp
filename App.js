import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabNav from "./src/navigation/TabNav";
import AuthNav from "./src/navigation/AuthNav";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./src/firebase-config";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();
export default function App() {
  const [isSignedIn, setIsSignIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setIsSignIn(true);
        console.log(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isSignedIn ? (
            <Stack.Screen name="Auth" component={AuthNav} />
          ) : (
            <Stack.Screen name="TabNav" component={TabNav} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
