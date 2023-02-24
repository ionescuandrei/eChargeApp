import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { Polyline } from "react-native-maps";

import { useEffect, useState } from "react";

const MapDirections = () => {
  const [route, setRoute] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.tomtom.com/routing/1/calculateRoute/37.3317876,-122.0054812:37.771707,-122.4053769/json?instructionsType=text&language=en-US&vehicleHeading=90&sectionType=traffic&report=effectiveSettings&routeType=eco&traffic=true&avoid=unpavedRoads&travelMode=car&vehicleMaxSpeed=120&vehicleCommercial=false&vehicleEngineType=combustion&key=api"
      )
      .then(function (response) {
        // handle success
        setRoute(response.data.routes[0].legs[0].points);
        console.log(response.data.routes[0].legs[0].points);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return <Polyline coordinates={route} strokeWidth={3} strokeColor="hotpink" />;
};

export default MapDirections;

const styles = StyleSheet.create({});
