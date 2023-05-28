import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, Avatar } from "@react-native-material/core";
import AvatarPickPhoto from "../../components/AvatarPickPhoto";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Text, TextInput } from "@react-native-material/core";
const Profile = ({ route }) => {
  console.log(route.params.email);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [car, setCar] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", route.params.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userObj = docSnap.data();
        console.log(userObj);
        setFirstName(userObj.firstname);
        setLastName(userObj.lastname);
        setCity(userObj.city);
        setCountry(userObj.country);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    fetchUser();
  }, []);
  const cityHandler = (ci) => {
    setCity(ci);
  };
  const countryHandler = (ci) => {
    setCountry(ci);
  };
  const userAddHandler = async () => {
    const userRef = doc(db, "users", route.params.email);

    // Set the "capital" field of the city 'DC'
    await updateDoc(userRef, {
      city: city,
      country: country,
    });
    Alert.alert("Added");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Edit Profile</Text>
      </View>
      <View style={styles.footer}>
        <ScrollView>
          <Stack fill center spacing={4}>
            <AvatarPickPhoto />
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <Text style={styles.name}>
                  {firstname} {lastname}
                </Text>
                <Text style={styles.info}>{route.params.email}</Text>

                <View style={styles.textIn}>
                  <TextInput
                    placeholder={city}
                    onChangeText={cityHandler}
                    value={city}
                  />
                </View>
                <View style={styles.textIn}>
                  <TextInput
                    onChangeText={countryHandler}
                    placeholder={country}
                    value={country}
                  />
                </View>

                <TouchableOpacity
                  onPress={userAddHandler}
                  style={styles.buttonContainer}
                >
                  <Text>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Stack>
        </ScrollView>
      </View>
    </View>
  );
};

export default Profile;

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
  info: { textAlign: "center" },
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
  buttonContainer: {
    marginTop: 10,

    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },

  textIn: {
    marginVertical: 5,
    width: 300,
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});
