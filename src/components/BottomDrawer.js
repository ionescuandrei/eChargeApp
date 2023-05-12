import {
  Image,
  Modal,
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import SubText from "./SubText ";
import Icon from "@expo/vector-icons/FontAwesome5";
import { useEffect } from "react";

const BottomDrawer = ({
  numberOfCharges,
  chargingStations,
  handleCloseBottomSheet,
  isBottomSheetOpen,
  summary,
  trip,
}) => {
  const {
    lengthInMeters,
    travelTimeInSeconds,
    departureTime,
    arrivalTime,
    batteryConsumptionInkWh,
    remainingChargeAtArrivalInkWh,
    totalChargingTimeInSeconds,
  } = summary;

  const windowHeight = Dimensions.get("window").height;
  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " h " : " h ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " min " : " min ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay;
  }
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        // We use the state here to toggle visibility of Bottom Sheet
        visible={isBottomSheetOpen}
        // We pass our function as default function to close the Modal
        onRequestClose={handleCloseBottomSheet}
      >
        <View style={[styles.bottomSheet, { height: windowHeight * 0.4 }]}>
          <ScrollView>
            <View
              style={{
                flex: 0,
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <SubText
                text={"Travel summary"}
                family={"sans-serif"}
                size={16}
                color={"#86827e"}
              />
              <TouchableOpacity onPress={handleCloseBottomSheet}>
                <Icon name="times" size={20} />
              </TouchableOpacity>
            </View>

            <View style={{ paddingVertical: 1 }}>
              <SubText
                text={
                  secondsToHms(travelTimeInSeconds) +
                  "(" +
                  lengthInMeters / 1000 +
                  " km)"
                }
                family={"sans-serif"}
                color={"#292929"}
                size={18}
              />
              <SubText
                text={
                  secondsToHms(totalChargingTimeInSeconds) +
                  " " +
                  numberOfCharges +
                  " charges"
                }
                family={"sans-serif"}
                color={"#86827e"}
                size={14}
              />

              <View
                style={{
                  opacity: 0.2,
                  height: 1,
                  borderWidth: 1,
                  borderColor: "#86827e",
                  marginVertical: 5,
                }}
              />
              <View style={styles.card}>
                <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                  <Icon name="home" size={28} />
                  <View style={styles.textContent}>
                    <Text numberOfLines={1} style={styles.cardtitle}>
                      {trip.originLocation}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: 18,
                        alignItems: "center",
                      }}
                    >
                      <Icon name="clock" size={12} />
                      <Text style={styles.cardDescription}>
                        {departureTime ? departureTime.substr(11, 8) : null}
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginLeft: 120, justifyContent: "flex-end" }}>
                    <Text style={styles.cardDescription}>
                      {trip.currentChargeInkWh.toFixed(1)} kWH
                    </Text>
                  </View>
                </View>
              </View>

              {chargingStations.map((station, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => console.log(station)}
                >
                  <View style={styles.card}>
                    <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                      <Icon name="charging-station" size={28} />
                      <View style={styles.textContent}>
                        <Text numberOfLines={1} style={styles.cardtitle}>
                          {
                            station.summary.chargingInformationAtEndOfLeg
                              .chargingParkName
                          }
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              marginLeft: 18,
                              alignItems: "center",
                            }}
                          >
                            <Icon name="clock" size={12} />
                            <Text style={styles.cardDescription}>
                              {station.summary.arrivalTime
                                ? station.summary.arrivalTime.substr(11, 8)
                                : null}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              marginLeft: 18,
                              alignItems: "center",
                            }}
                          >
                            <Icon name="bolt" size={12} />
                            <Text style={styles.cardDescription}>
                              {station.summary.chargingInformationAtEndOfLeg
                                .chargingTimeInSeconds
                                ? secondsToHms(
                                    station.summary
                                      .chargingInformationAtEndOfLeg
                                      .chargingTimeInSeconds
                                  )
                                : 0}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          marginLeft: 35,
                          flexDirection: "row",
                          alignSelf: "flex-end",
                        }}
                      >
                        <Text style={styles.cardDescription}>
                          {station.summary.remainingChargeAtArrivalInkWh.toFixed(
                            1
                          )}
                        </Text>
                        <Icon name="long-arrow-alt-right" size={12} />
                        <Text style={styles.cardDescription}>
                          {(
                            station.summary.remainingChargeAtArrivalInkWh +
                            station.summary.chargingInformationAtEndOfLeg
                              .targetChargeInkWh
                          ).toFixed(1)}
                          kWH
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}

              <View style={styles.card}>
                <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                  <Icon name="flag-checkered" size={28} />
                  <View style={styles.textContent}>
                    <Text numberOfLines={1} style={styles.cardtitle}>
                      {trip.destinationLocation}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: 18,
                        alignItems: "center",
                      }}
                    >
                      <Icon name="clock" size={12} />
                      <Text style={styles.cardDescription}>
                        {arrivalTime ? arrivalTime.substr(11, 8) : null}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default BottomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "flex-start",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    bottom: 0,
    borderWidth: 1,
    borderColor: "#009387",
  },

  card: {
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
    shadowColor: "shadow",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 7,
    marginTop: 1,
    marginBottom: 2,
    marginLeft: 5,
    marginRight: 6,
  },
  textContent: {},
  cardtitle: {
    fontSize: 14,
    marginLeft: 20,

    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
  },
});
