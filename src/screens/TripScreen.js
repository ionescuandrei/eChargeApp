import { SafeAreaView, StyleSheet, StatusBar, View, Text } from "react-native";
import React, { useState } from "react";
import SearchBarWithAutocomplete from "../components/SearchBarWithAutocomplete";
import axios from "axios";
import { useDebounce } from "../utility/useDebounce";

const TripScreen = () => {
  const [search, setSearch] = useState({ term: "", fetchPredictions: false });
  const [search1, setSearch1] = useState({ term: "", fetchPredictions: false });
  const [location, setLocation] = useState({});
  const [destination, setDestination] = useState({});
  const [predictions, setPredictions] = useState([]);
  const [predictions1, setPredictions1] = useState([]);
  const [showPredictions, setShowPredictions] = useState(true);
  const [showPredictions1, setShowPredictions1] = useState(true);
  const { container, body } = styles;
  const GOOGLE_PACES_API_BASE_URL =
    "https://maps.googleapis.com/maps/api/place";
  const onChangeText = async () => {
    if (search.term.trim() === "") return;
    if (!search.fetchPredictions) return;
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_API_KEY}&input=${search.term}`;
    try {
      const result = await axios.request({
        method: "post",
        url: apiUrl,
      });
      if (result) {
        const {
          data: { predictions },
        } = result;
        setPredictions(predictions);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useDebounce(onChangeText, 1000, [search.term]);
  const onChangeText1 = async () => {
    if (search1.term.trim() === "") return;
    if (!search1.fetchPredictions) return;
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_API_KEY}&input=${search1.term}`;
    try {
      const result = await axios.request({
        method: "post",
        url: apiUrl,
      });
      if (result) {
        const {
          data: { predictions },
        } = result;
        setPredictions1(predictions);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useDebounce(onChangeText1, 1000, [search1.term]);
  // ==== Change No. 7====
  /**
   * Grab lattitude and longitude on prediction tapped
   *    by sending another reqyest using the place id.
   * You can check what kind of information you can get at:
   *    https://developers.google.com/maps/documentation/places/web-service/details#PlaceDetailsRequests
   */
  const onPredictionTapped = async (placeId, description) => {
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/details/json?key=${GOOGLE_API_KEY}&place_id=${placeId}`;
    try {
      const result = await axios.request({
        method: "post",
        url: apiUrl,
      });
      if (result) {
        const {
          data: {
            result: {
              geometry: { location },
            },
          },
        } = result;
        const { lat, lng } = location;
        setLocation(location);
        console.log("Origin ", location);
        setShowPredictions(false);
        setSearch({ term: description });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onPredictionTapped1 = async (placeId, description) => {
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/details/json?key=${GOOGLE_API_KEY}&place_id=${placeId}`;
    try {
      const result = await axios.request({
        method: "post",
        url: apiUrl,
      });
      if (result) {
        const {
          data: {
            result: {
              geometry: { location },
            },
          },
        } = result;
        const { lat, lng } = location;
        console.log("Destination ", location);
        setDestination(location);
        setShowPredictions1(false);
        setSearch1({ term: description });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Create Itinerary</Text>
      </View>
      <SafeAreaView style={styles.footer}>
        <View style={body}>
          <Text>Origin</Text>
          <SearchBarWithAutocomplete
            value={search.term}
            onChangeText={(text) => {
              setSearch({ term: text, fetchPredictions: true });
            }}
            showPredictions={showPredictions}
            predictions={predictions}
            onPredictionTapped={onPredictionTapped}
          />
          <Text>Destination</Text>
          <SearchBarWithAutocomplete
            value={search1.term}
            onChangeText={(text) => {
              setSearch1({ term: text, fetchPredictions: true });
            }}
            showPredictions={showPredictions1}
            predictions={predictions1}
            onPredictionTapped={onPredictionTapped1}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  body: {
    paddingHorizontal: 20,
  },
});
export default TripScreen;

// import { StyleSheet, Text, Touchable, View } from "react-native";

// import React, { useEffect, useState } from "react";
// import { Button } from "@react-native-material/core";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import MapView, { Marker } from "react-native-maps";
// import { Polyline } from "react-native-maps";
// const { PROVIDER_GOOGLE } = MapView;
// const TripScreen = () => {
//   const [coords, setCoords] = useState([]);

//   useEffect(() => {}, []);
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
//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         <Polyline coordinates={coords} />
//       </MapView>
//     </View>
//   );
// };

// export default TripScreen;

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     flex: 1, //the container will fill the whole screen.
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });
