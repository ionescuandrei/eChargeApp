import {
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Text, TextInput } from "@react-native-material/core";
import React from "react";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase-config";

const CarChargingMode = ({
  modalVisible,
  modalFunction,
  chargingConnection,
  chargingCurve,
  chargingMode,
}) => {
  const [facilityType, setFacilityType] = useState("");
  const [facilityTypes, setFacilityTypes] = useState([]);
  const [plugType, setPlugType] = useState("");
  const [plugTypes, setPlugTypes] = useState([]);

  const [chargeInkWh, setChargeInkWh] = useState(0);
  const [timeToChargeInSeconds, setTimeToChargeInSeconds] = useState(0);
  useEffect(() => {
    let facility = [];
    let plug = [];
    async function fetchFacicityTypes() {
      const querySnapshot = await getDocs(
        collection(db, "stationsChargingTypes")
      );
      querySnapshot.forEach((doc) => {
        facility.push(doc.data());
      });
      setFacilityTypes(facility);
    }
    async function fetchPlugTypes() {
      const querySnapshot = await getDocs(collection(db, "carPlugTypes"));
      querySnapshot.forEach((doc) => {
        plug.push(doc.data());
      });
      setPlugTypes(plug);
    }
    fetchFacicityTypes();
    fetchPlugTypes();
  }, []);
  const handle_facilityType = (val) => {
    setFacilityType(val);
  };
  const handle_plugType = (val) => {
    setPlugType(val);
  };
  const handle_chargeInKwh = (val) => {
    setChargeInkWh(parseFloat(val));
  };
  const handle_timeToCharge = (val) => {
    setTimeToChargeInSeconds(parseInt(val));
  };
  const onSubmit = () => {
    const obj = {
      chargingConnections: [
        {
          facilityType: facilityType,
          plugType: plugType,
        },
      ],
      chargingCurve: [
        {
          chargeInkWh: chargeInkWh,
          timeToChargeInSeconds: timeToChargeInSeconds,
        },
      ],
    };
    modalFunction(!modalVisible);
    chargingMode(obj);
    chargingConnection({
      facilityType: facilityType,
      plugType: plugType,
    });
    chargingCurve({
      chargeInkWh: chargeInkWh,
      timeToChargeInSeconds: timeToChargeInSeconds,
    });
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <Text style={styles.textTitle}>Car charging mode</Text>
              <Picker
                selectedValue={facilityType}
                onValueChange={(itemValue, itemIndex) =>
                  handle_facilityType(itemValue)
                }
              >
                {facilityTypes.map((item) => (
                  <Picker.Item
                    key={item.facilityType}
                    label={item.facilityType}
                    value={item.facilityType}
                  />
                ))}
              </Picker>

              <Picker
                selectedValue={plugType}
                onValueChange={(itemValue, itemIndex) =>
                  handle_plugType(itemValue)
                }
              >
                {plugTypes.map((item) => (
                  <Picker.Item
                    key={item.plugType}
                    label={item.plugType}
                    value={item.plugType}
                  />
                ))}
              </Picker>

              <View style={styles.action}>
                <TextInput
                  placeholder="Charge In kWh"
                  inputMode="numeric"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => handle_chargeInKwh(val)}
                />
              </View>

              <View style={styles.action}>
                <TextInput
                  placeholder="Time to charge in seconds"
                  keyboardType="number-pad"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => handle_timeToCharge(val)}
                />
              </View>
            </ScrollView>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onSubmit}
            >
              <Text style={styles.textStyle}>Add</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CarChargingMode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",

    marginTop: 22,
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#009387",
  },
  buttonClose: {
    backgroundColor: "#009387",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textTitle: {
    color: "#009387",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});
