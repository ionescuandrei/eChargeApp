import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Conector = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.textContent}>
        <Image
          style={{ width: 30, height: 30 }}
          source={require("../assets/images/ev-plug-chademo.png")}
        />
        <Text numberOfLines={1} style={styles.cardtitle}>
          {props.type}
        </Text>
        <Text style={styles.cardtitle}> {props.currentType} </Text>
        <Text style={styles.cardtitle}> {props.ratedPowerKW} kw </Text>
      </View>
    </View>
  );
};

export default Conector;

const styles = StyleSheet.create({
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
});
