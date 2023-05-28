import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  Pressable,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBarWithAutocomplete from "../components/SearchBarWithAutocomplete";
import axios from "axios";
import { useDebounce } from "../utility/useDebounce";
import Slider from "@react-native-community/slider";
import images from "../utility/images";
import { Badge, Stack } from "@react-native-material/core";
import Icon from "@expo/vector-icons/FontAwesome5";
import * as Location from "expo-location";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import {
  setDestination,
  setOrigin,
  setCarCharge,
  setOriginLocation,
  setDestinationLocation,
} from "../redux/tripSlice";
import { useNavigation } from "@react-navigation/native";

const TripScreen = ({ route }) => {
  const user = useSelector((state) => state.user);
  const [search, setSearch] = useState({ term: "", fetchPredictions: false });
  const [search1, setSearch1] = useState({ term: "", fetchPredictions: false });
  const [predictions, setPredictions] = useState([]);
  const [predictions1, setPredictions1] = useState([]);
  const [showPredictions, setShowPredictions] = useState(true);
  const [showPredictions1, setShowPredictions1] = useState(true);
  const [chargingLevel, setChargingLevel] = useState(0);
  const [mylocation, setMyLocation] = useState("");
  const [showMyLocation, setShowMyLocation] = useState(true);
  const { container, body } = styles;
  const [carMaxCharge, setCarMaxCharge] = useState(25);
  const [carMaxSpeed, setCarMaxSpeed] = useState(50);
  const [carMaxWeight, setCarMaxWeight] = useState(1000);
  const [carUrl, setCarUrl] = useState(
    "https://ev-database.org/img/auto/Renault_Twingo_ZE_2020/Renault_Twingo_ZE_2020-02.jpg"
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const GOOGLE_PACES_API_BASE_URL =
    "https://maps.googleapis.com/maps/api/place";

  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", route.params.email);
      console.log(route.params.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userObj = docSnap.data();

        setCarMaxCharge(Math.floor(userObj.car.specs.maxChargeInkWh));
        setCarUrl(userObj.car.specs.url);
        setCarMaxSpeed(userObj.car.specs.topSpeed);
        setCarMaxWeight(userObj.car.specs.vehicleWeight);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    fetchUser();
  }, []);
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
        dispatch(setOrigin(location));
        setShowPredictions(false);
        setSearch({ term: description });
        dispatch(setOriginLocation(description));
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
        console.log(location);
        dispatch(setDestination(location));
        setShowPredictions1(false);
        setSearch1({ term: description });
        dispatch(setDestinationLocation(description));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getLocationHandler = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("niet granted");
      return;
    }

    let pos = await Location.getLastKnownPositionAsync();
    dispatch(
      setOrigin({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      })
    );
    if (pos == null) {
      await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
      })
        .then((res) =>
          dispatch(
            setOrigin({
              lat: res.coords.latitude,
              lng: res.coords.longitude,
            })
          )
        )
        .then(async (res) => {
          const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}&key=${GOOGLE_API_KEY}`;
          console.log(apiUrl);
          try {
            const result = await axios
              .request({
                method: "post",
                url: apiUrl,
              })
              .then((res) => {
                dispatch(
                  setOriginLocation(res.data.results[0].formatted_address)
                );
                setMyLocation(res.data.results[0].formatted_address);
                setSearch({ term: res.data.results[0].formatted_address });
              });
          } catch (e) {
            console.log(e);
          }
        })
        .catch((e) => console.log(e));
    } else {
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}&key=${GOOGLE_API_KEY}`;
      console.log(apiUrl);
      try {
        const result = await axios
          .request({
            method: "post",
            url: apiUrl,
          })
          .then((res) => {
            dispatch(setOriginLocation(res.data.results[0].formatted_address));
            setMyLocation(res.data.results[0].formatted_address);
            setSearch({ term: res.data.results[0].formatted_address });
          });
      } catch (e) {
        console.log(e);
      }
    }
    setShowMyLocation(false);
  };
  const submit = () => {
    if (search.term.trim() == "") {
      Alert.alert("Please enter a search term on Origin adress");
      return;
    } else if (search1.term.trim() == "") {
      Alert.alert("Please enter a search term on Destination adress");
      return;
    } else if (chargingLevel === 0) {
      Alert.alert("Please select charging level");
    } else {
      dispatch(setCarCharge(chargingLevel));
      navigation.navigate("TripDetailScreen", {
        speed: carMaxSpeed,
        weight: carMaxWeight,
      });
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Create Itinerary</Text>
      </View>
      <SafeAreaView style={styles.footer}>
        <View style={body}>
          <Text style={styles.textContent}>Origin</Text>
          {showMyLocation ? (
            <SearchBarWithAutocomplete
              value={search.term}
              onChangeText={(text) => {
                setSearch({ term: text, fetchPredictions: true });
              }}
              showPredictions={showPredictions}
              predictions={predictions}
              onPredictionTapped={onPredictionTapped}
            />
          ) : (
            <Text style={{ paddingLeft: 10, fontSize: 16 }}>{mylocation}</Text>
          )}
          <Pressable
            onPress={getLocationHandler}
            style={{ flexDirection: "row", marginVertical: 10 }}
          >
            <Icon name="location-arrow" size={24} />
            <Text style={styles.textContent}>My current location</Text>
          </Pressable>

          <Text style={styles.textContent}>Destination</Text>
          <SearchBarWithAutocomplete
            value={search1.term}
            onChangeText={(text) => {
              setSearch1({ term: text, fetchPredictions: true });
            }}
            showPredictions={showPredictions1}
            predictions={predictions1}
            onPredictionTapped={onPredictionTapped1}
          />
          <View style={{ marginVertical: 5 }}>
            <Text style={styles.textContent}>Charge Level (kwh)</Text>
            <Slider
              minimumValue={1}
              maximumValue={carMaxCharge}
              minimumTrackTintColor="#009387"
              maximumTrackTintColor="#000000"
              onSlidingComplete={(val) => setChargingLevel(val)}
            />
          </View>

          <View style={styles.itemBadge}>
            <Image
              source={{ uri: carUrl }}
              style={{ height: 200, width: 350 }}
            />
            <View
              style={{
                position: "absolute",
                height: 30,
                width: 50,
                left: 10,
                top: 10,
              }}
            >
              <Badge label={chargingLevel} color="#009387" />
            </View>
          </View>

          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={submit}
          >
            <Text style={styles.textStyle}>Next</Text>
          </Pressable>
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
    paddingVertical: 12,
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
  textContent: {
    fontSize: 20,
    marginLeft: 10,
    color: "#009387",
  },
});
export default TripScreen;
