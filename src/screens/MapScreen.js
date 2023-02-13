import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import auth from "../firebase-config";
import { useNavigation } from "@react-navigation/native";
import MapView from "react-native-maps";
const MapScreen = () => {
  const navigation = useNavigation();
  const exitApp = () => {
    signOut(auth)
      .then(() => navigation.navigate("Auth"))
      .catch((error) => console.error(error));
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={exitApp}>
        <Text>signOut</Text>
      </TouchableOpacity>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
    // <View>

    // </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
export default MapScreen;
