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
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setCar } from "../redux/userSlice";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase-config";
import CarSearch from "../components/CarSearch";

const CarUserScreen = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedCarMarca, setSelectedCarMarca] = useState("");
  const [selectedCarModel, setSelectedCarModel] = useState("");
  const [filteredCar, setFilteredCar] = useState([]);
  const [cars, setCars] = useState([]);
  const user = useSelector((state) => state.user);
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
    console.log(user);
  }, []);
  const getItem = (item) => {
    Alert.alert(item.naming.make + " " + item.naming.model + " is selected");
    setSelectedCar(item);
  };
  const handleSelectedCarModel = (itemValue) => {
    setSelectedCarMarca(itemValue);
    const filtere = cars
      .filter((car) => car.naming.model != itemValue)
      .map((item) => item);
    setFilteredCar(filtere);
  };
  const onSubmit = () => {
    dispatch(setCar(selectedCar));
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // Signed in
        const email = userCredential.user.email;
        console.log("email sign in", email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
      });
    setDoc(doc(db, "users", user.email), {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      city: user.city,
      country: user.country,
      car: selectedCar,
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Add your car</Text>
      </View>
      <View style={styles.footer}>
        <CarSearch getItem={getItem} />

        {/* <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
            <Text>Marca</Text>
            <Picker
              selectedValue={selectedCarMarca}
              onValueChange={(itemValue, itemIndex) =>
                handleSelectedCarModel(itemValue)
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
          </View> */}

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
