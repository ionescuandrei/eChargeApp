import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";

import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigation, CommonActions } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { Polyline } from "react-native-maps";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import BottomDrawer from "../components/BottomDrawer";
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

const { PROVIDER_GOOGLE } = MapView;
const TripMapScreen = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null);
  const [coords, setCoords] = useState([]);
  const user = useSelector((state) => state.user);
  const trip = useSelector((state) => state.trip);
  const [userData, setUserData] = useState(null);
  const [startMarker, setStartMarker] = useState({});
  const [endMarker, setEndMarker] = useState({});
  const [chargingStations, setChargingStations] = useState([]);
  const [summary, setSummary] = useState({});
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);
  const [numberOfCharges, setNumberOfCharges] = useState(0);
  const [isRoute, setIsRoute] = useState(false);

  // Function to open the bottom sheet
  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  // Function to close the bottom sheet
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const [region, setRegion] = useState({
    latitude: 44.3077568,
    longitude: 23.7967414,
    latitudeDelta: 0.000920000000000698,
    longitudeDelta:
      (Dimensions.get("window").width / Dimensions.get("window").height) *
      0.0122,
  });

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      const docRef = doc(db, "users", route.params.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userObj = docSnap.data();
        setUserData(userObj);
        getRoute(userObj);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    fetchUser();
  }, []);

  const parseRoute = (routeResponse) => {
    console.log(routeResponse);
    try {
      var rout = routeResponse.routes[0];
      var locations;
      var routa = [];
      for (var index = 0; index < rout.legs.length; index++) {
        if (index < rout.legs.length - 1) {
          setChargingStations([
            ...chargingStations,
            {
              summary: rout.legs[index].summary,
              coordinate: rout.legs[index + 1].points[0],
            },
          ]);
          console.log(rout.legs[index].summary);
        }

        locations = rout.legs[index].points.map((element) => {
          return { latitude: element.latitude, longitude: element.longitude };
        });
        routa = [...routa, ...locations];
      }
      setCoords(routa);
      setNumberOfCharges(rout.legs.length - 1);
      setStartMarker(routa[0]);
      setEndMarker(routa[routa.length - 1]);
      setSummary(routeResponse.routes[0].summary);
      setLoading(false);
      getRegionForCoordinates(routa);
    } catch (error) {
      Alert.alert("No route found");
      console.log(error);
    }
  };

  var APIKEY = "WJ8s7PREG7SxRMtQTZaS6c0kyLjO5lfa";

  const getRoute = (userVal) => {
    var consum = "45,10:100," + userVal.car.specs.constantSpeedConsumtion;
    var max = userVal.car.specs.maxChargeInkWh;
    console.log("depart", trip.departTime);
    var carChargingModes = {
      chargingModes: userVal.car.chargingModes,
    };
    var routeOptions = {
      key: APIKEY,
      origin: trip.origin,
      destination: trip.destination,
      vehicleWeight: userVal.car.specs.vehicleWeight,
      maxCharge: userVal.car.specs.maxChargeInkWh,
      minFinalCharge: max * 0.2,
      minChargeAtStop: max * 0.2,
      speedConsumption: consum,
      chargingModes: carChargingModes,
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
      options.origin.lng +
      ":" +
      options.destination.lat +
      "," +
      options.destination.lng +
      "/json?key=" +
      APIKEY +
      "&vehicleEngineType=electric&constantSpeedConsumptionInkWhPerHundredkm=" +
      options.speedConsumption +
      "&currentChargeInkWh=" +
      trip.currentChargeInkWh +
      "&maxChargeInkWh=" +
      options.maxCharge +
      "&departAt=" +
      trip.departTime +
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
    console.log(routeOptions.chargingModes);
    postData(url, routeOptions.chargingModes)
      .then((data) => parseRoute(data))
      .catch((err) => console.error("OPSS", err));
  };
  async function postData(url = "", data = {}) {
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

  const getRegionForCoordinates = (points) => {
    let minLat = Math.min(...points.map((p) => p.latitude));
    let maxLat = Math.max(...points.map((p) => p.latitude));
    let minLon = Math.min(...points.map((p) => p.longitude));
    let maxLon = Math.max(...points.map((p) => p.longitude));

    const midX = (minLat + maxLat) / 2;
    const midY = (minLon + maxLon) / 2;
    const deltaX = maxLat - minLat + 0.8;
    const deltaY = maxLon - minLon;
    setRegion({
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY,
    });
    mapRef.current.animateToRegion({
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY,
    });
  };
  const resetTrip = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "TripScreen" }],
      })
    );
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          textContent={"Loading..."}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
      ) : (
        <MapView ref={mapRef} style={styles.map} initialRegion={region}>
          <Polyline
            coordinates={coords}
            strokeColor="#009387"
            strokeWidth={5}
          />
          <Marker coordinate={startMarker} />
          <Marker coordinate={endMarker} />
          {chargingStations &&
            chargingStations.map((station, index) => (
              <Marker
                key={index}
                coordinate={station.coordinate}
                pinColor="green"
              />
            ))}
        </MapView>
      )}
      <BottomDrawer
        numberOfCharges={numberOfCharges}
        handleOpenBottomSheet={handleOpenBottomSheet}
        handleCloseBottomSheet={handleCloseBottomSheet}
        isBottomSheetOpen={isBottomSheetOpen}
        chargingStations={chargingStations}
        summary={summary}
        trip={trip}
      />
      <TouchableOpacity
        onPress={handleOpenBottomSheet}
        style={[
          styles.signIn,
          {
            borderColor: "#009387",
            borderWidth: 1,
            marginTop: 15,
          },
        ]}
      >
        <Text
          style={[
            styles.textSign,
            {
              color: "#009387",
            },
          ]}
        >
          Trip
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={resetTrip}
        style={[
          styles.signIn,
          {
            borderColor: "#009387",
            borderWidth: 1,
            marginTop: 15,
          },
        ]}
      >
        <Text
          style={[
            styles.textSign,
            {
              color: "#009387",
            },
          ]}
        >
          Replanning
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TripMapScreen;

const styles = StyleSheet.create({
  // container: {
  //   ...StyleSheet.absoluteFillObject,
  //   flex: 1, //the container will fill the whole screen.
  //   justifyContent: "flex-end",
  //   alignItems: "center",
  // },
  map: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 400,
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
  },

  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  action: {
    flexDirection: "row",
    marginTop: 5,
    borderBottomWidth: 1,
    paddingBottom: 5,
    textAlign: "center",
    fontSize: 18,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  card: {
    padding: 5,
    elevation: 2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: 60,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 6,

    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
  },
});
