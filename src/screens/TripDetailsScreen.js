import {
  Pressable,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
} from "react-native";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { Text, TextInput } from "@react-native-material/core";
import { setApiData } from "../redux/tripSlice";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";

const TripDetailsScreen = ({ route }) => {
  const [coords, setCoords] = useState([]);
  const [ruta, setRuta] = useState({});
  const [minDeviationDistance, setMinDeviationDistance] = useState(0);
  const [traffic, setTrafic] = useState(0);
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const trip = useSelector((state) => state.trip);
  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", route.params.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userObj = docSnap.data();
        setUserData(userObj);
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
      locations = rout.legs[index].points.map((element) => {
        return { latitude: element.latitude, longitude: element.longitude };
      });

      routa = [...routa, ...locations];
    }
    setCoords(routa);
    setRuta(routeResponse.routes[0]);
    // dispatch(setApiData(routeResponse.routes[0]));
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
    navigation.navigate("TripMapScreen", { ruta: ruta });
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
    })
      .then((response) => response.json())
      .catch((e) => console.log(e));
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Create Itinerary</Text>
      </View>
      <SafeAreaView style={styles.footer}>
        <View>
          <View>
            <Text styles={styles.textTitle}>Naming</Text>
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Trafic"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleMarca(val)}
            />
          </View>
          <Text>Charge Level (kwh)</Text>
          <Slider
            minimumValue={1}
            maximumValue={50}
            minimumTrackTintColor="#009387"
            maximumTrackTintColor="#000000"
          />

          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => getRoute(userData)}
          >
            <Text style={styles.textStyle}>Create</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default TripDetailsScreen;
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
  button: {
    borderRadius: 20,
    padding: 5,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#009387",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  containerImage: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
});
