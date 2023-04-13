import { StyleSheet, Text, View, ScrollView } from "react-native";

const EVStation = ({ route, navigation }) => {
  const { itemId, marker } = route.params;
  return (
    <ScrollView style={styles.styleScrol}>
      <View style={[styles.container]}>
        <View style={styles.subContainer}>
          <View style={styles.textContainer}>
            <View style={styles.placeNameTitle}>
              <Text style={styles.placeName}>{marker.poi.name}</Text>
              <Text>Adress: {marker.address.freeformAddress}</Text>
            </View>
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
  subContainer: {
    flex: 1,
    margin: 15,
  },
  portraitContainer: {
    flexDirection: "column",
  },
  // landscapeContainer: {
  //   flexDirection: "row"
  // },
  placeImagePortret: {
    width: 500,
    height: 250,
  },
  placeImageLandscape: {
    alignSelf: "center",
    width: 500,
    height: 250,
  },
  placeNameTitle: {
    alignItems: "flex-start",
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
    fontFamily: "Times New Roman",
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
