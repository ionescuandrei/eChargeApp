import { StyleSheet, Text, Touchable, View } from "react-native";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@react-native-material/core";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { Polyline } from "react-native-maps";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const { PROVIDER_GOOGLE } = MapView;
const TripMapScreen = ({ route }) => {
  const [coords, setCoords] = useState([]);
  const user = useSelector((state) => state.user);
  const trip = useSelector((state) => state.trip);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", route.params.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userObj = docSnap.data();
        console.log("user log", userObj, user, trip);
        setUserData(userObj);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    fetchUser();
    getRoute();
  }, []);
  const parseRoute = (routeResponse) => {
    var rout = routeResponse.routes[0];
    var locations;
    for (var index = 0; index < rout.legs.length; index++) {
      locations = rout.legs[index].points.map((element) => {
        return { latitude: element.latitude, longitude: element.longitude };
      });
    }
    setCoords(locations);
    console.log("locatopns", locations);
    return locations;
  };

  var APIKEY = "WJ8s7PREG7SxRMtQTZaS6c0kyLjO5lfa";

  const getRoute = () => {
    var max = userData.car.specs.maxChargeInkWh;
    var routeOptions = {
      key: APIKEY,
      origin: trip.origin,
      destination: trip.destination,
      vehicleWeight: userData.car.specs.vehicleWeight,
      maxCharge: userData.car.specs.maxChargeInkWh,
      minFinalCharge: max * 0.2,
      minChargeAtStop: max * 0.2,
      speedConsumption:
        userData.car.specs.constantSpeedConsumpltionInkWhPerHundredKm,
      chargingModes: userData.car.chargingModes,
    };
    calculateRoute(routeOptions);
  };
  // Calculate the Route here
  var baseUrl =
    "https://api.tomtom.com/routing/1/calculateLongDistanceEVRoute/";
  var buildURL = (options) => {
    var url =
      baseUrl +
      options.origin.lat +
      "," +
      options.origin.lon +
      ":" +
      options.destination.lat +
      "," +
      options.destination.lon +
      "/json?key=" +
      APIKEY +
      "&vehicleEngineType=electric&constantSpeedConsumptionInkWhPerHundredkm=" +
      options.speedConsumption +
      "&currentChargeInkWh=" +
      audi.currentChargeInkWh +
      "&maxChargeInkWh=" +
      options.maxCharge +
      "&minChargeAtDestinationInkWh=" +
      options.minFinalCharge +
      "&minChargeAtChargingStopsInkWh=" +
      options.minChargeAtStop;
    console.log("url = ", url);
    return url;
  };
  var calculateRoute = (routeOptions) => {
    var rute = {};
    var url = buildURL(routeOptions);
    postData(url, routeOptions.chargingModes)
      .then((data) => parseRoute(data))
      .catch((err) => console.error(err));
  };
  function postData(url = "", data = {}) {
    //Default options are marked with *
    return fetch(url, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Polyline coordinates={coords} />
      </MapView>
    </View>
  );
};

export default TripMapScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
