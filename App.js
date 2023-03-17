import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabNav from "./src/navigation/TabNav";
import AuthNav from "./src/navigation/AuthNav";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/firebase-config";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import Drawer from "./src/navigation/DrawerNav";
import { func } from "./src/constants";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();
export default function App() {
  const [isSignedIn, setIsSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        // keeps the splash screen visible while assets are cached
        await SplashScreen.preventAutoHideAsync();

        // pre-load/cache assets: images, fonts, and videos
        await func.loadAssetsAsync();
      } catch (e) {
        // console.warn(e);
      } finally {
        // loading is complete
        setIsLoading(false);
      }
    }

    prepare();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setIsSignIn(true);
        console.log(user);
        // ...
      } else {
        setIsSignIn(false);
      }
    });
  }, []);
  useEffect(() => {
    // when loading is complete
    if (isLoading === false) {
      // hide splash function
      const hideSplash = async () => SplashScreen.hideAsync();

      // hide splash screen to show app
      hideSplash();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isSignedIn ? (
            <Stack.Screen name="Auth" component={AuthNav} />
          ) : (
            <Stack.Screen name="DrawerNav" component={Drawer} />
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
