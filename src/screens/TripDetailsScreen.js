import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Slider from "@react-native-community/slider";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Badge } from "@react-native-material/core";
import { useDispatch, useSelector } from "react-redux";
import { setDepartData, setWeight, setSpeed } from "../redux/tripSlice";
import { useNavigation } from "@react-navigation/native";

const TripDetailsScreen = ({ route }) => {
  const { speed, weight } = route.params;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [avgSpeed, setAvgSpeed] = useState(90);
  const [addWeight, setAddWeight] = useState(1);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    console.log(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(true);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  const handleAvgSpeed = (speed) => {
    setAvgSpeed(speed);
  };
  const handleWeight = (kg) => {
    setAddWeight(kg);
  };
  const submit = () => {
    dispatch(setDepartData(date.toISOString()));
    dispatch(setSpeed(avgSpeed));
    dispatch(setWeight(addWeight));
    navigation.navigate("TripMapScreen");
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Settings</Text>
      </View>
      <View style={styles.footer}>
        <ScrollView>
          <View>
            <Text style={styles.textContent}>Choose depart time and date</Text>
            <View style={styles.action}>
              <Pressable onPress={showDatepicker}>
                <Text>
                  {date.toLocaleString().substring(0, 10)}
                  {date.toLocaleString().substring(19)}
                </Text>
              </Pressable>
            </View>

            <View style={styles.action}>
              <Pressable onPress={showTimepicker}>
                <Text>{date.toLocaleString().substring(11, 19)}</Text>
              </Pressable>
            </View>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
          </View>
          <View style={{ marginVertical: 20 }}>
            <Text style={styles.textContent}>Average Speed (km/h)</Text>
            <View
              style={{
                position: "absolute",
                height: 30,
                width: 50,
                left: 280,
                top: 10,
              }}
            >
              <Badge label={avgSpeed} max={200} color="#009387" />
            </View>
            <Slider
              step={1}
              style={styles.slider}
              minimumValue={1}
              maximumValue={120}
              minimumTrackTintColor="#009387"
              maximumTrackTintColor="#000000"
              onSlidingComplete={(val) => handleAvgSpeed(val)}
            />
          </View>

          <View style={{ marginVertical: 5 }}>
            <Text style={styles.textContent}>
              Payload added to your car eg. people, suitcases(kg)
            </Text>
            <View
              style={{
                position: "absolute",
                height: 30,
                width: 50,
                left: 280,
                top: 30,
              }}
            >
              <Badge label={addWeight} max={1000} color="#009387" />
            </View>
            <Slider
              step={1}
              style={styles.slider}
              minimumValue={1}
              maximumValue={1000}
              minimumTrackTintColor="#009387"
              maximumTrackTintColor="#000000"
              onSlidingComplete={(val) => handleWeight(val)}
            />
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={submit}
            >
              <Text style={styles.textStyle}>Next</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default TripDetailsScreen;

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
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  textContent: {
    fontSize: 18,
    fontWeight: "bold",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 30,
    backgroundColor: "rgb(235,235,235)",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  slider: { marginVertical: 20, marginHorizontal: 5 },

  button: {
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    height: 30,
    marginTop: 40,
  },
  buttonOpen: {
    backgroundColor: "#009387",
  },
  textStyle: { alignSelf: "center" },
});
