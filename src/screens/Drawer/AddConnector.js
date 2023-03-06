import {
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import { Text, TextInput } from "@react-native-material/core";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const AddConnector = () => {
  const [data, setData] = useState({
    standard: "IEC_62196_T2_COMBO",
    power_type: "DC",
    max_voltage: 400,
    max_amperage: 125,
    power: 50,
    last_updated: "2023-01-10T05:36:27.000Z",
  });
  const handle_standard = (val) => {
    setData({
      ...data,
      standard: val,
    });
  };
  const handle_power_type = (val) => {
    setData({
      ...data,
      power_type: val,
    });
  };
  const handle_max_voltage = (val) => {
    setData({
      ...data,
      max_voltage: val,
    });
  };
  const handle_max_amp = (val) => {
    setData({
      ...data,
      max_amperage: val,
    });
  };
  const handle_power = (val) => {
    setData({
      ...data,
      power: val,
    });
  };
  const onSubmit = () => {
    setDoc(doc(db, "connectors", data.standard), {
      standard: data.standard,
      power_type: data.power_type,
      max_voltage: data.max_voltage,
      max_amperage: data.max_amperage,
      power: data.power,
      last_updated: new Date.now(),
    });
    alert("Db save");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Add connector</Text>
      </View>
      <View style={styles.footer}>
        <ScrollView>
          <View style={styles.action}>
            <TextInput
              placeholder="Standard"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handle_standard(val)}
            />
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="Power type"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handle_power_type(val)}
            />
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="Max Voltage"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handle_max_voltage(val)}
            />
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="Max Amperage"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handle_max_amp(val)}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Charging Power"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handle_power(val)}
            />
          </View>

          <TouchableOpacity
            onPress={onSubmit}
            style={[
              styles.signIn,
              {
                borderColor: "#009387",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#009387",
                },
              ]}
            >
              Add
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default AddConnector;

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
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
});
