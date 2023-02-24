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

const AddCarScreen = () => {
  const [data, setData] = useState({
    naming: {
      make: "",
      model: "",
      version: "",
      edition: "",
    },
    connectors: {
      standard: "",
      power: 0,
      time: null,
      speed: 0,
    },
    battery: {
      usable_kwh: 0,
      full_kwh: 0,
    },
    body: {
      seats: 5,
    },
    performance: {
      acceleration: 0,
      top_speed: 0,
    },
    range: {
      provider_is_estimated: 0,
      chargetrip_range: {
        best: 0,
        worst: 0,
      },
    },
    media: {
      url: "",
    },

    // "naming": {
    //   "make": "Audi",
    //   "model": "e-tron",
    //   "version": "55 quattro",
    //   "edition": null,
    //   "chargetrip_version": "55 quattro (2019 - 2020)"
    // },
    // "connectors": [
    //   {
    //     "standard": "IEC_62196_T2",
    //     "power": 11,
    //     "time": 555,
    //     "speed": 39
    //   },
    //   {
    //     "standard": "IEC_62196_T2_COMBO",
    //     "power": 146,
    //     "time": 26,
    //     "speed": 590
    //   }
    // ],
    // "adapters": [],
    // "battery": {
    //   "usable_kwh": 86.5,
    //   "full_kwh": 95
    // },
    // "body": {
    //   "seats": 5
    // },
    // "range": {
    //   "chargetrip_range": {
    //     "best": 442,
    //     "worst": 381
    //   }
    // },
    // "media": {
    //   "image": {
    //     "id": "637cfd94fff76be0b355b82c",
    //     "type": "image",
    //     "url": "https://cars.chargetrip.io/637cfd94fff76be0b355b82c.png",
    //     "height": 400,
    //     "width": 697,
    //     "thumbnail_url": "https://cars.chargetrip.io/637cfd94fff76be0b355b82c-eb92fb5e6c7433d5e31dbe682f7ae922e78a232c.png",
    //     "thumbnail_height": 150,
    //     "thumbnail_width": 262
    //   },
  });
  const navigate = useNavigation();
  const handleMarca = (val) => {
    setData({
      ...data,
      marca: val,
    });
  };
  const handleModel = (val) => {
    setData({
      ...data,
      model: val,
    });
  };
  const handleYear = (val) => {
    setData({
      ...data,
      year: val,
    });
  };
  const handleBattery = (val) => {
    setData({
      ...data,
      battCapacity: val,
    });
  };
  const handleCharging = (val) => {
    setData({
      ...data,
      chargeCapacity: val,
    });
  };
  const handlePlug = (val) => {
    setData({
      ...data,
      plugType: val,
    });
  };
  const handleSpeed = (val) => {
    setData({
      ...data,
      vehicleSpeed: val,
    });
  };
  const onSubmit = () => {
    // Add a new document in collection "cities"

    setDoc(doc(db, "cars", data.marca + " " + data.model), {
      marca: data.marca,
      model: data.model,
      year: data.year,
      battCapacity: data.battCapacity,
      chargeCapacity: data.chargeCapacity,
      plugType: data.plugType,
      vehicleSpeed: data.vehicleSpeed,
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
              placeholder="Year"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleYear(val)}
            />
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="Battery Capacity"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleBattery(val)}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Charging Capacity"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleCharging(val)}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Plug Type"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePlug(val)}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Vehicle Max Speed "
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleSpeed(val)}
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
