import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setCar } from "../redux/userSlice";

const CarUserScreen = () => {
  const [selectedCarMarca, setSelectedCarMarca] = useState("");
  const [selectedCarModel, setSelectedCarModel] = useState("");
  const [filteredCar, setFilteredCar] = useState([]);
  const [cars, setCars] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    let car = [];
    async function fetchCars() {
      const querySnapshot = await getDocs(collection(db, "cars"));
      querySnapshot.forEach((doc) => {
        car.push(doc.data());
      });
      setCars(car);
    }
    fetchCars();
    console.log(cars);
  }, []);
  const handleSelectedCarModel = (itemValue) => {
    setSelectedCarMarca(itemValue);
    const filtere = cars
      .filter((car) => car.naming.model != itemValue)
      .map((item) => item);
    setFilteredCar(filtere);
  };
  const onSubmit = () => {
    dispatch(setCar({ selectedCarMarca, selectedCarModel }));
    navigation.navigate("CarUserScreen");
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Add your car</Text>
      </View>
      <View style={styles.footer}>
        <ScrollView>
          <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
            <Text>Marca</Text>
            <Picker
              selectedValue={handleSelectedCarModel}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCarMarca(itemValue)
              }
            >
              {cars.map((item) => (
                <Picker.Item
                  key={item.naming.make}
                  label={item.naming.make}
                  value={item.naming.make}
                />
              ))}
            </Picker>
          </View>
          <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
            <Text>Model</Text>
            <Picker
              selectedValue={selectedCarModel}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCarModel(itemValue)
              }
            >
              {filteredCar.map((item) => (
                <Picker.Item
                  key={item.naming.model}
                  label={item.naming.model}
                  value={item.naming.model}
                />
              ))}
            </Picker>
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
              Register
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

export default CarUserScreen;
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
