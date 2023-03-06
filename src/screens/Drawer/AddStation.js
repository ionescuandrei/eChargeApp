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
import PickLocation from "../../components/PickLocation";
import { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import * as Location from "expo-location";

const AddStation = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({
    name: "Ladestation Alter Fischmarkt 11",
    address: "Alter Fischmarkt 11",
    city: "Hamburg",
    postal_code: "20457",
    country: "DEU",
    coordinates: {
      latitude: "53.5486507",
      longitude: "9.99697003",
    },
    connectors: [],
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const [coordinates, setCoordinates] = useState({
    latitude: "53.5486507",
    longitude: "9.99697003",
  });
  const navigate = useNavigation();
  const handleName = (val) => {
    setData({
      ...data,
      name: val,
    });
  };
  const handleAddress = (val) => {
    setData({
      ...data,
      address: val,
    });
  };
  const handleCity = (val) => {
    setData({
      ...data,
      city: val,
    });
  };
  const handlePostal = (val) => {
    setData({
      ...data,
      postal_code: val,
    });
  };
  const handleCountry = (val) => {
    setData({
      ...data,
      country: val,
    });
  };

  locationPickHandler = (ev) => {
    setCoordinates({
      latitude: ev.latitude,
      longitude: ev.longitude,
    });
    console.log(ev);
  };
  const onSubmit = () => {
    // Add a new document in collection "cities"

    setDoc(doc(db, "stations", data.name), {
      name: data.name,
      address: data.address,
      city: data.address,
      postal_code: data.postal_code,
      country: data.country,
      coordinates: coordinates,
      connectors: [],
    });
    alert("Db save");
    navigation.navigate("Home");
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Add station</Text>
      </View>
      <View style={styles.footer}>
        <ScrollView>
          <View style={styles.action}>
            <TextInput
              placeholder="Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleName(val)}
            />
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="Address"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleAddress(val)}
            />
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="City"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleCity(val)}
            />
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="Postal code"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePostal(val)}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Country"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleCountry(val)}
            />
          </View>

          <View style={styles.pickMap}>
            <PickLocation
              onLocationPicked={this.locationPickHandler}
              ref={(ref) => (locationPicker = ref)}
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
export default AddStation;
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
