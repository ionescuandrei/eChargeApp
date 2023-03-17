import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView from "react-native-maps";
import MapDirections from "../components/MapDirections";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

// Using a local version here because we need it to import MapView from 'expo'
import MapViewDirections from "../components/MapViewDirections";

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 44.3077568,
        longitude: 23.7967414,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0122,
      },
      openIndex: null,
      render: false,
      show: false,
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
    this.getWithinDistance = this.getWithinDistance.bind(this);
  }

  componentWillMount() {
    this.index = 0;
    this.images = {};
    this.animation = new Animated.Value(0);
    this.opacityAnimation = new Animated.Value(0);
  }

  componentDidMount() {
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
          const { location } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...location,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  componentDidAppear() {
    this.getStations();
    this.getLocationHandler();
  }
  getStations = async () => {
    const sta = [];
    const querySnapshot = await getDocs(collection(db, "stations"));
    querySnapshot.forEach((doc) => {
      sta.push(doc.data);
      console.log(doc.id, " => ", doc.data());
    });
    this.setState({ stations: sta });
  };
  getWithinDistance = () => {
    let latlng = {};
    let newData = null;
    var selectedMarker = [];
    var lat1 = this.state.region.latitude;
    var lon1 = this.state.region.longitude;

    for (var i = 0; i < this.state.stations.length; i++) {
      var lat2 = this.state.stations[i].location.latitude;
      var lon2 = this.state.stations[i].location.longitude;
      var R = 6371;
      var dLat = (lat2 - lat1) * (Math.PI / 180);
      var dLon = (lon2 - lon1) * (Math.PI / 180);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      if (d <= 2.0) {
        latlng = {
          latitude: lat2,
          longitude: lon2,
        };
        selectedMarker.push(this.state.stations[i]);
      }
    }

    this.setState({
      markers: selectedMarker,
    });
    console.log("selcted markers", selectedMarker);
  };
  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.setState((prevState) => {
          return {
            region: {
              ...prevState.region,
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            },
          };
        });
        this.getWithinDistance();
      },
      (err) => {
        console.log(err);
        alert("Fetching the location faild");
      }
    );
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
    console.log("props.selectedPlace", this.state.markers);
    console.log("props.region", this.state.region);
    const interpolations = this.state.markers.map((marker, index) => {
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
        <MapView
          ref={(map) => (this.map = map)}
          initialRegion={this.props.region}
          style={styles.container}
        >
          {this.state.markers.map((marker, index) => {
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
              <MapView.Marker key={index} coordinate={marker.location}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
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
          {this.state.markers.map((marker, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => this.handleShow(index)}
            >
              <View style={styles.card}>
                <Image
                  source={marker.image}
                  style={styles.cardImage}
                  resizeMode="cover"
                  ref={(img) => (this.images[index] = img)}
                />
                <View style={styles.textContent}>
                  <Text numberOfLines={1} style={styles.cardtitle}>
                    {marker.name}
                  </Text>
                  <Text numberOfLines={1} style={styles.cardDescription}>
                    {marker.type}
                  </Text>
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
});
