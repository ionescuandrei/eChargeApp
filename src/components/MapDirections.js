import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { Polyline } from "react-native-maps";

import { useEffect, useState } from "react";

const MapDirections = () => {
  const [route, setRoute] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.tomtom.com/routing/1/calculateRoute/44.4237673,24.3573198:44.4237652,23.7967414/json?instructionsType=text&language=en-US&vehicleHeading=90&sectionType=traffic&report=effectiveSettings&routeType=eco&traffic=true&avoid=unpavedRoads&travelMode=car&vehicleMaxSpeed=120&vehicleCommercial=false&vehicleEngineType=combustion&key=WJ8s7PREG7SxRMtQTZaS6c0kyLjO5lfa"
      )
      .then(function (response) {
        // handle success
        setRoute(response.data.routes[0].legs[0].points);
        console.log("L", response.data.routes[0].legs[0].points);
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
