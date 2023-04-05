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
    battery: "",
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
  const [connector, setConector] = useState({
    standard: "",
    power: 0,
    time: null,
    speed: 0,
  });
  const [connector2, setConector2] = useState({
    standard: "",
    power: 0,
    time: null,
    speed: 0,
  });
  const navigate = useNavigation();
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
  const handleConnectionStandard = (val) => {
    setConector({
      ...connector,
      standard: val,
    });
  };
  const handlePower = (val) => {
    setConector({
      ...connector,
      power: val,
    });
  };
  const handleTime = (val) => {
    setConector({
      ...connector,
      time: val,
    });
  };
  const handleSpeed = (val) => {
    setConector({
      ...connector,
      speed: val,
    });
  };
  const handleBattery = (val) => {
    setData({
      ...data,
      battery: val,
    });
  };
  const handleTopSpeed = (val) => {
    setData({
      ...data,
      topSpeed: val,
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
      connectors: connector,
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
          <View style={styles.action}>
            <TextInput
              placeholder="Standard"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleConnectionStandard(val)}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Power"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePower(val)}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Time "
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleTime(val)}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Speed"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleSpeed(val)}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Baterry"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleBattery(val)}
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
