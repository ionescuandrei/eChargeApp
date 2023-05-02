import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  Pressable,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBarWithAutocomplete from "../components/SearchBarWithAutocomplete";
import axios from "axios";
import { useDebounce } from "../utility/useDebounce";
import Slider from "@react-native-community/slider";
import images from "../utility/images";
import { Badge, Stack } from "@react-native-material/core";
import { setDestination, setOrigin, setCarCharge } from "../redux/tripSlice";
import { useNavigation } from "@react-navigation/native";

const TripScreen = () => {
  const [search, setSearch] = useState({ term: "", fetchPredictions: false });
  const [search1, setSearch1] = useState({ term: "", fetchPredictions: false });
  const [predictions, setPredictions] = useState([]);
  const [predictions1, setPredictions1] = useState([]);
  const [showPredictions, setShowPredictions] = useState(true);
  const [showPredictions1, setShowPredictions1] = useState(true);
  const [chargingLevel, setChargingLevel] = useState(0);
  const { container, body } = styles;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  GOOGLE_API_KEY = "AIzaSyBSj4fI1IG3aT9p1pU0EOBfSb5MAdtNM44";
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
        dispatch(setOrigin(location));
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
        dispatch(setDestination(location));
        setShowPredictions1(false);
        setSearch1({ term: description });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const submit = () => {
    console.log("submit");
    dispatch(setCarCharge(chargingLevel));
    navigation.navigate("TripMapScreen");
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
          <Text>Charge Level (kwh)</Text>
          <Slider
            minimumValue={1}
            maximumValue={50}
            minimumTrackTintColor="#009387"
            maximumTrackTintColor="#000000"
            onSlidingComplete={(val) => setChargingLevel(val)}
          />
          <View style={styles.itemBadge}>
            <Image source={images.car} style={{ height: 200, width: 350 }} />
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
            <Text style={styles.textStyle}>Create</Text>
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
export default TripScreen;
