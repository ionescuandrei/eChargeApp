import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MapDirections from "../components/MapDirections";
import TouchText from "../components/TouchText";
import { colors, device, fonts } from "../constants";
import axios from "axios";
import Icon from "@expo/vector-icons/FontAwesome5";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
const { PROVIDER_GOOGLE } = MapView;

// Using a local version here because we need it to import MapView from 'expo'
import MapViewDirections from "../components/MapViewDirections";
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;
export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 44.3077568,
        longitude: 23.7967414,
        latitudeDelta: 0.0422,
        longitudeDelta:
          (Dimensions.get("window").width / Dimensions.get("window").height) *
          0.0422,
      },
      openIndex: null,
      render: false,
      show: true,
      overlayImage: false,
      coords: {
        left: new Animated.Value(0),
        top: new Animated.Value(0),
        width: new Animated.Value(0),
        height: new Animated.Value(0),
      },
      stations: [],
      transition: {},
      markers: [],
    };

    this.getLocationHandler = this.getLocationHandler.bind(this);
    // this.getWithinDistance = this.getWithinDistance.bind(this);
    this.getStations = this.getStations.bind(this);
    this.getStations2 = this.getStations2.bind(this);
  }

  componentDidMount() {
    this.getLocationHandler();
    this.index = 0;
    this.images = {};
    this.animation = new Animated.Value(0);
    this.opacityAnimation = new Animated.Value(0);
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinates } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinates,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
    // this.getWithinDistance();
  }

  getStations2(lat, long) {
    let sta = {};
    axios
      .get(
        "https://api.tomtom.com/search/2/nearbySearch/.json?key=WJ8s7PREG7SxRMtQTZaS6c0kyLjO5lfa&lat=" +
          lat +
          "&lon=" +
          long +
          "&radius=10000&categorySet=7309"
      )
      .then((res) => {
        const stations = res.data.results;
        this.setState({ stations });
      })

      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  getStations = async () => {
    const querySnapshot = await getDocs(collection(db, "stations"));
    querySnapshot.forEach((doc) => {
      const ob = doc.data();
      this.setState((previousState) => ({
        ...previousState,
        stations: [...previousState.stations, ob],
      }));
    });
  };

  // getWithinDistance = () => {
  //   var selectedMarker = [];
  //   var lat1 = this.state.region.latitude;
  //   var lon1 = this.state.region.longitude;

  //   for (var i = 0; i < this.state.stations.length; i++) {
  //     var lat2 = this.state.stations[i].position.lat;
  //     var lon2 = this.state.stations[i].position.lon;
  //     var R = 6371;
  //     var dLat = (lat2 - lat1) * (Math.PI / 180);
  //     var dLon = (lon2 - lon1) * (Math.PI / 180);
  //     var a =
  //       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //       Math.cos(lat1 * (Math.PI / 180)) *
  //         Math.cos(lat2 * (Math.PI / 180)) *
  //         Math.sin(dLon / 2) *
  //         Math.sin(dLon / 2);
  //     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //     var d = R * c;
  //   }

  //   this.setState({
  //     markers: selectedMarker,
  //   });
  //   console.log("selcted markers", selectedMarker);
  // };
  getLocationHandler = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("nit granted");
      return;
    }

    let pos = await Location.getLastKnownPositionAsync();
    console.log("getLocation", pos);
    if (pos == null) {
      await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
      })
        .then((res) =>
          this.setState((prevState) => {
            return {
              show: true,
              region: {
                ...prevState.region,
                latitude: res.coords.latitude,
                longitude: res.coords.longitude,
              },
            };
          })
        )
        .catch((e) => console.log(e));
    } else {
      this.setState((prevState) => {
        return {
          show: true,
          region: {
            ...prevState.region,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
        };
      });
    }

    console.log("test from getLocation2");
    this.map.animateToRegion({
      ...this.state.region,
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
    });

    this.getStations2(this.state.region.latitude, this.state.region.longitude);
  };
  navigationButtonPressed({ buttonId }) {
    this.getLocationHandler();
    this.map.animateToRegion({
      ...this.state.region,
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
    });
  }

  handleShow = (index) => {
    const selPlace = this.state.markers[index];
    // Navigation.push("MyStack3", {
    //   component: {
    //     name: "places.PlaceDetail",
    //     passProps: {
    //       text: "Pushed screen",
    //       selectedPlace: selPlace,
    //     },
    //     options: {
    //       topBar: {
    //         title: {
    //           text: selPlace.name,
    //         },
    //       },
    //     },
    //   },
    // });
  };
  render() {
    let mark = [];
    const marckers = this.state.stations.map((marker, index) => {
      mark.push({
        latitude: marker.position.lat,
        longitude: marker.position.lon,
      });
      console.log("stations", marker);
      console.log("marker", marker.poi.name);
      return mark;
    });

    const interpolations = marckers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH + 1,
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>
        {this.state.show && (
          <MapView
            ref={(map) => (this.map = map)}
            followsUserLocation
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            initialRegion={this.state.region}
            style={styles.container}
          >
            {mark.map((marker, index) => {
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale,
                  },
                ],
              };
              const opacityStyle = {
                opacity: interpolations[index].opacity,
              };
              return (
                <Marker key={index} coordinate={marker}>
                  <Animated.View>
                    <View>
                      <Icon name="charging-station" size={32} color="green" />
                    </View>
                  </Animated.View>
                </Marker>
              );
            })}
            {/* <MapDirections /> */}
          </MapView>
        )}
        {!this.state.show && (
          <View style={styles.containerNoLocation}>
            <Text style={styles.textLocationNeeded}>
              We need your location data...
            </Text>
            <TouchText
              onPress={() => this.setState({ show: true })}
              style={styles.btnGoTo}
              styleText={styles.btnGoToText}
              text="Go To Permissions"
            />
          </View>
        )}
        <Text style={{ backgroundColor: "grey" }}>Nearest stations found</Text>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.stations.map((marker, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => this.handleShow(index)}
            >
              <View style={styles.card}>
                <View style={styles.textContent}>
                  <Text numberOfLines={1} style={styles.cardtitle}>
                    {marker.poi.name}
                  </Text>
                  <Text numberOfLines={1} style={styles.cardDescription}>
                    {marker.address.freeformAddress}
                  </Text>
                  <View style={{ width: 20, height: 20 }}>
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={require("../assets/images/ev-plug-chademo.png")}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hide: {
    opacity: 0,
  },
  transitionContainer: {
    backgroundColor: "#FFF",
    padding: 10,
  },
  transitionImage: {
    width: "100%",
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
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
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
  containerNoLocation: {
    alignItems: "center",
    height: device.height,
    justifyContent: "center",
    position: "absolute",
    width: device.width,
  },
  textLocationNeeded: {
    fontFamily: fonts.uberMedium,
    fontSize: 16,
    marginBottom: 16,
  },
  btnGoTo: {
    backgroundColor: colors.black,
    borderRadius: 3,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  btnGoToText: {
    color: colors.white,
    fontFamily: fonts.uberMedium,
    fontSize: 16,
  },
});
