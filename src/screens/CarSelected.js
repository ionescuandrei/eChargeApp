import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  SafeAreaView,
  Pressable,
  Alert,
} from "react-native";
import { Badge, Stack } from "@react-native-material/core";
import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigation } from "@react-navigation/native";

const CarSelected = ({ route }) => {
  const { email, item } = route.params;
  const navigation = useNavigation();
  console.log(route.params);
  const submit = async () => {
    Alert.alert("Car changed");
    const userDoc = doc(db, "users", email);
    await updateDoc(userDoc, {
      car: item,
    });
    navigation.navigate("eCharge App");
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>
          {item.naming.make + " " + item.naming.model}
        </Text>
      </View>
      <SafeAreaView style={styles.footer}>
        <View>
          <Text style={styles.textContent}>Edition {item.naming.edition}</Text>
          <Text style={styles.textContent}>Version {item.naming.version}</Text>
          <View style={styles.itemBadge}>
            <Image
              source={{ uri: item.specs.url }}
              style={{ height: 200, width: 350 }}
            />
            <View
              style={{
                position: "absolute",
                height: 30,
                width: 50,
                left: 300,
                top: 10,
              }}
            >
              <Badge label={item.specs.maxChargeInkWh} color="#009387" />
              <Badge label={"kwh"} color="#009387" />
            </View>
          </View>

          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={submit}
          >
            <Text style={styles.textStyle}>Select</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CarSelected;

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
    paddingVertical: 12,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  body: {
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 50,
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    width: 100,
    alignSelf: "center",
  },
  buttonOpen: {
    backgroundColor: "#009387",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  containerImage: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
  textContent: {
    fontSize: 20,
    marginLeft: 10,
    color: "#009387",
    textAlign: "center",
  },
});
