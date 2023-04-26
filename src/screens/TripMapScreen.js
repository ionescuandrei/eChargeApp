import { StyleSheet, Text, Touchable, View } from "react-native";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@react-native-material/core";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { Polyline } from "react-native-maps";
const { PROVIDER_GOOGLE } = MapView;
const TripMapScreen = () => {
  const [coords, setCoords] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log(user);
  }, []);
  //   const parseRoute = (routeResponse) => {
  //     var route = routeResponse.routes[0];
  //     var locations;
  //     for (var index = 0; index < route.legs.length; index++) {
  //       locations = route.legs[index].points.map((element) => {
  //         return { latitude: element.latitude, longitude: element.longitude };
  //       });
  //     }
  //     setCoords(locations);
  //     console.log("locatopns", locations);
  //     return locations;
  //   };
  //   var audi = {
  //     constantSpeedConsumpltionInkWhPerHundredKm: "45,19:100,22.4",
  //     vehicleEngineType: "electric",
  //     vehicleWeight: 2490,
  //     currentChargeInkWh: 45.0,
  //     maxChargeInkWh: 95.0,
  //   };
  //   var APIKEY = "WJ8s7PREG7SxRMtQTZaS6c0kyLjO5lfa";

  //   var audiChargingModes = {
  //     chargingModes: [
  //       {
  //         chargingConnections: [
  //           {
  //             facilityType: "Charge_200_to_240V_1_Phase_at_16A",
  //             plugType: "IEC_62196_Type_2_Outlet",
  //           },
  //         ],
  //         chargingCurve: [
  //           {
  //             chargeInkWh: 95,
  //             timeToChargeInSeconds: 89100,
  //           },
  //         ],
  //       },
  //       {
  //         chargingConnections: [
  //           {
  //             facilityType: "Charge_Direct_Current_at_50kW",
  //             plugType: "Combo_to_IEC_62196_Type_2_Base",
  //           },
  //         ],
  //         chargingCurve: [
  //           {
  //             chargeInkWh: 95,
  //             timeToChargeInSeconds: 600,
  //           },
  //         ],
  //       },
  //     ],
  //   };
  //   const route = () => {
  //     var max = audi.maxChargeInkWh;
  //     var routeOptions = {
  //       key: APIKEY,
  //       origin: { lat: 44.3077568, lon: 23.7967414 },
  //       destination: { lat: 44.3077568, lon: 23.79 },
  //       vehicleWeight: audi.vehicleWeight,
  //       maxCharge: max,
  //       minFinalCharge: max * 0.2,
  //       minChargeAtStop: max * 0.2,
  //       speedConsumption: audi.constantSpeedConsumpltionInkWhPerHundredKm,
  //       chargingModes: audiChargingModes,
  //     };
  //     calculateRoute(routeOptions);
  //   };
  //   // Calculate the Route here
  //   var baseUrl =
  //     "https://api.tomtom.com/routing/1/calculateLongDistanceEVRoute/";
  //   var buildURL = (options) => {
  //     var url =
  //       baseUrl +
  //       options.origin.lat +
  //       "," +
  //       options.origin.lon +
  //       ":" +
  //       options.destination.lat +
  //       "," +
  //       options.destination.lon +
  //       "/json?key=" +
  //       APIKEY +
  //       "&vehicleEngineType=electric&constantSpeedConsumptionInkWhPerHundredkm=" +
  //       options.speedConsumption +
  //       "&currentChargeInkWh=" +
  //       audi.currentChargeInkWh +
  //       "&maxChargeInkWh=" +
  //       options.maxCharge +
  //       "&minChargeAtDestinationInkWh=" +
  //       options.minFinalCharge +
  //       "&minChargeAtChargingStopsInkWh=" +
  //       options.minChargeAtStop;
  //     console.log("url = ", url);
  //     return url;
  //   };
  //   var calculateRoute = (routeOptions) => {
  //     var rute = {};
  //     var url = buildURL(routeOptions);
  //     postData(url, routeOptions.chargingModes)
  //       .then((data) => parseRoute(data))
  //       .catch((err) => console.error(err));
  //   };
  //   function postData(url = "", data = {}) {
  //     //Default options are marked with *
  //     return fetch(url, {
  //       method: "POST",
  //       cache: "no-cache",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     }).then((response) => response.json());
  //   }
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
