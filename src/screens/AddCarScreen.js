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
const AddCarScreen = () => {
  const [data, setData] = useState({
    marca: "",
    model: "",
    year: 2005,
    battCapacity: 0,
    chargeCapacity: 0,
    plugType: "",
    vehicleSpeed: 0,
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
            onPress={() => navigation.goBack()}
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
