import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AddStation = () => {
  const [data, setData] = useState({
    name: "Ladestation Alter Fischmarkt 11",
    address: "Alter Fischmarkt 11",
    city: "Hamburg",
    postal_code: "20457",
    state: null,
    country: "DEU",
    coordinates: {
      latitude: "53.5486507",
      longitude: "9.99697003",
    },
    connectors: [],
  });
  return (
    <View>
      <Text>AddStation</Text>
    </View>
  );
};

export default AddStation;

const styles = StyleSheet.create({});
