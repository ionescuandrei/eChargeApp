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

import { useState } from "react";
import { Text, TextInput } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setProfile } from "../redux/userSlice";

const CompleteProfileScreen = () => {
  const dispatch = useDispatch();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const navigation = useNavigation();
  const handle_firstname = (val) => {
    setFirstName(val);
  };
  const handle_lastname = (val) => {
    setLastName(val);
  };
  const handle_city = (val) => {
    setCity(val);
  };
  const handle_country = (val) => {
    setCountry(val);
  };
  const onSubmit = () => {
    dispatch(setProfile({ firstname, lastname, city, country }));
    navigation.navigate("CarUserScreen");
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register</Text>
      </View>
      <View style={styles.footer}>
        <ScrollView>
          <View style={styles.action}>
            <TextInput
              placeholder="First name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handle_firstname(val)}
            />
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="Last name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handle_lastname(val)}
            />
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="City"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handle_city(val)}
            />
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="Country"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handle_country(val)}
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
              Next
            </Text>
          </TouchableOpacity>
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
              Go back
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default CompleteProfileScreen;

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
