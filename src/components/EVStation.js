import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  Platform,
  TouchableOpacity,
  Divider,
  Alert,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";

const EVStation = ({ route, navigation }) => {
  const { itemId, marker } = route.params;
  console.log(marker.poi);
  const callNumber = () => {
    let phone = marker.poi.phone;
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${marker.poi.phone}`;
    } else {
      phoneNumber = `tel:${marker.poi.phone}`;
    }
    Linking.openURL(phoneNumber);
  };
  return (
    <ScrollView style={styles.styleScrol}>
      <View style={[styles.container]}>
        <View style={styles.placeNameTitle}>
          <Text style={styles.placeName}>{marker.poi.name}</Text>
          <Text>Adress: {marker.address.freeformAddress}</Text>

          <View style={styles.adressContainer}>
            <Text style={styles.adressStyle}>Pentru rezervări sună la</Text>
            <TouchableOpacity onPress={callNumber}>
              <View style={styles.callButton}>
                <Icon name="phone" size={24} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EVStation;

const styles = StyleSheet.create({
  styleScrol: { height: "100%", width: "100%" },
  container: {
    display: "flex",
  },

  placeNameTitle: {
    alignItems: "center",
    marginTop: 15,
  },
  badgeContaniner: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 30,
    width: 40,
    borderRadius: 10,
    backgroundColor: "#258",
    alignSelf: "flex-start",
  },
  badge: { fontSize: 18 },
  placeName: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 28,
  },
  adressStyle: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 10,
    flexDirection: "row",
  },
  deleteButton: {
    alignItems: "center",
  },
  adressContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textWeb: {
    fontSize: 20,
    fontFamily: "Times New Roman",
    alignSelf: "center",
  },
});
