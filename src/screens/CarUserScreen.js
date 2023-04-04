import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

const CarUserScreen = () => {
  const [selectedCarMarca, setSelectedCarMarca] = useState("");
  const [selectedCarModel, setSelectedCarModel] = useState("");
  const [cars, setCars] = useState([]);
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

  return (
    <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
      <Picker
        selectedValue={selectedCarMarca}
        onValueChange={(itemValue, itemIndex) => setSelectedCarMarca(itemValue)}
      >
        {cars.map((item) => (
          <Picker.Item
            key={item.naming.model}
            label={item.naming.model}
            value={item.naming.model}
          />
        ))}
      </Picker>
    </View>
  );
};

export default CarUserScreen;
