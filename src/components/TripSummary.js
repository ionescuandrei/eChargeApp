import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TripSummary = ({ route }) => {
  const { summary } = route.params;
  const {
    lengthInMeters,
    travelTimeInSeconds,
    departureTime,
    arrivalTime,
    batteryConsumptionInkWh,
    remainingChargeAtArrivalInkWh,
    totalChargingTimeInSeconds,
  } = summary;
  return (
    <View>
      <Text>Length In Meters {lengthInMeters}</Text>
      <Text>Travel Time In Seconds {travelTimeInSeconds}</Text>
      <Text>Departure Time {departureTime}</Text>
      <Text>Arrival Time {arrivalTime}</Text>
      <Text>Battery Consumption In kWh {batteryConsumptionInkWh}</Text>
      <Text>
        Remaining Charge At Arrival In kWh {remainingChargeAtArrivalInkWh}
      </Text>
      <Text>Total Charging Time In Seconds {totalChargingTimeInSeconds}</Text>
    </View>
  );
};

export default TripSummary;

const styles = StyleSheet.create({});
