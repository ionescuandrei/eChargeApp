import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  Platform,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import { Divider, ListItem } from "@react-native-material/core";
import GetDirection from "./GetDirection";
const EVStation = ({ route, navigation }) => {
  const { itemId, marker, mylocation } = route.params;
  console.log(marker);
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
          <Divider style={{ marginTop: 20 }} leadingInset={16} />
          <View style={styles.adressContainer}>
            <Text style={styles.adressStyle}>Pentru rezervări sună la</Text>
            <TouchableOpacity onPress={callNumber}>
              <View style={styles.callButton}>
                <Icon name="phone" size={24} />
              </View>
            </TouchableOpacity>
          </View>
          <GetDirection
            mylocation={{
              latitude: mylocation.latitude,
              longitude: mylocation.longitude,
            }}
            location={{
              latitude: marker.position.lat,
              longitude: marker.position.lon,
            }}
          />
          <Divider style={{ marginTop: 60 }} leadingInset={16} />
          <View style={{ width: 300 }}>
            <Text style={{ fontSize: 18 }}>Connectors</Text>
            {marker.chargingPark.connectors.map((item, index) => (
              <ListItem
                key={index}
                title={item.connectorType}
                secondaryText={`Power(KW)- ${item.ratedPowerKW} | Voltage(V)- ${item.voltageV}`}
                meta={item.currentType}
              />
            ))}
          </View>
          <Text>Distance to: {Math.round(marker.dist * 10) / 10} m</Text>
        </View>
        <View></View>
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textWeb: {
    fontSize: 20,
    fontFamily: "Times New Roman",
    alignSelf: "center",
  },
  callButton: {
    marginLeft: 10,
  },
});
