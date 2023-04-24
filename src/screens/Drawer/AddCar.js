import {
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  Platform,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import { Text, TextInput } from "@react-native-material/core";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import CarChargingMode from "../../components/CarChargingMode";

const AddCarScreen = () => {
  const navigate = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [chargingConnections, setChargingConnections] = useState([]);
  const [chargingCurves, setChargingCurves] = useState([]);
  const [data, setData] = useState({
    constantSpeedConsumpltionInkWhPerHundredKm: 0,
    vehicleWeight: 0,
    maxChargeInkWh: 0,
    topSpeed: 0,
    range: 0,
    url: "",
  });
  const [naming, setNaming] = useState({
    make: "",
    model: "",
    version: "",
    edition: "",
  });
  const modalFunction = (modVisible) => {
    setModalVisible([modVisible]);
  };
  const handle_charging_connections = (chargingConns) => {
    setChargingConnections([...chargingConnections, chargingConns]);
  };
  const handle_charging_curve = (chargingCurv) => {
    setChargingCurves([...chargingCurves, chargingCurv]);
  };

  const handleMarca = (val) => {
    setNaming({
      ...naming,
      make: val,
    });
  };
  const handleModel = (val) => {
    setNaming({
      ...naming,
      model: val,
    });
  };
  const handleVersion = (val) => {
    setNaming({
      ...naming,
      version: val,
    });
  };
  const handleEdition = (val) => {
    setNaming({
      ...naming,
      edition: val,
    });
  };

  const handleBattery = (val) => {
    setData({
      ...data,
      maxChargeInkWh: val,
    });
  };
  const handleTopSpeed = (val) => {
    setData({
      ...data,
      topSpeed: val,
    });
  };
  constantSpeedConsumpltionInkWhPerHundredKm;
  const handleWeight = (val) => {
    setData({
      ...data,
      vehicleWeight: val,
    });
  };
  const handleConsum = (val) => {
    setData({
      ...data,
      constantSpeedConsumpltionInkWhPerHundredKm: val,
    });
  };
  const handleRange = (val) => {
    setData({
      ...data,
      range: val,
    });
  };
  const handleUrl = (val) => {
    setData({
      ...data,
      url: val,
    });
  };
  const onSubmit = () => {
    // Add a new document in collection "cities"

    setDoc(doc(db, "cars", naming.make + " " + naming.model), {
      naming: naming,
      battery: data.battery,
      topSpeed: data.topSpeed,
      range: data.range,
      url: data.url,
    });
    alert("Db save");
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Add car</Text>
      </View>
      <View style={styles.footer}>
        <ScrollView>
          <View>
            <Text styles={styles.textTitle}>Naming</Text>
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Marca"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleMarca(val)}
            />
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="Model"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleModel(val)}
            />
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="Version"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleVersion(val)}
            />
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="Edition"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleEdition(val)}
            />
          </View>
          <View>
            <Text styles={styles.textTitle}>Tehnical specs</Text>
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="Vehicle weight"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleWeight(val)}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Max charge in kwh"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleBattery(val)}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Constant consumpltion In kWh Per Hundred Km:"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleConsum(val)}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="TopSpeed"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleTopSpeed(val)}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Range"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleRange(val)}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Url"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleUrl(val)}
            />
          </View>
          <CarChargingMode
            modalVisible={modalVisible}
            modalFunction={modalFunction}
            chargingConnection={handle_charging_connections}
            chargingCurve={handle_charging_curve}
          />
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Add charging mode</Text>
          </Pressable>
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

export default AddCarScreen;

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
  textTitle: { color: "#009387", fontWeight: "bold", fontSize: 16 },
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
  button: {
    borderRadius: 20,
    padding: 5,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#009387",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
