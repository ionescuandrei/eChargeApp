import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { Polyline } from "react-native-maps";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

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
    var rout = routeResponse.routes[0];
    var locations;
    var routa = [];
    for (var index = 0; index < rout.legs.length; index++) {
      setChargingStations([
        ...chargingStations,
        {
          summary: rout.legs[index].summary,
          coordinate: rout.legs[index].points[0],
        },
      ]);
      locations = rout.legs[index].points.map((element) => {
        return { latitude: element.latitude, longitude: element.longitude };
      });
      routa = [...routa, ...locations];
    }
    setCoords(routa);

    setStartMarker(routa[0]);
    setEndMarker(routa[routa.length - 1]);
    setSummary(routeResponse.routes[0].summary);
    setLoading(false);
    getRegionForCoordinates(routa);
    console.log("start marker", startMarker);
    console.log("end marker", endMarker);
  };

  var APIKEY = "WJ8s7PREG7SxRMtQTZaS6c0kyLjO5lfa";

  const getRoute = (userVal) => {
    var consum = "45,10:100," + userVal.car.specs.constantSpeedConsumtion;
    var max = userVal.car.specs.maxChargeInkWh;
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
      .catch((err) => console.error(err));
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
            strokeWidth={3}
          />
          <Marker coordinate={startMarker} />
          <Marker coordinate={endMarker} />
          {chargingStations.map((station, index) => {
            console.log("statio", station.coordinate);
            // <Marker coordinate={station.coordinate} />;
            // <TouchableOpacity>
            //   <Marker key={index} coordinate={station.coordinate} />
            //   <Text>{station.coordinate}</Text>
            // </TouchableOpacity>;
          })}
        </MapView>
      )}

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("TripSummary", {
            summary: summary,
          });
          console.log(summary);
        }}
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
          Trip summary
        </Text>
      </TouchableOpacity>
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
});
