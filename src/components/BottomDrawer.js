import {
  Image,
  Modal,
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import SubText from "./SubText ";
import Icon from "@expo/vector-icons/FontAwesome5";

const BottomDrawer = ({ handleCloseBottomSheet, isBottomSheetOpen }) => {
  const windowHeight = Dimensions.get("window").height;

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        // We use the state here to toggle visibility of Bottom Sheet
        visible={isBottomSheetOpen}
        // We pass our function as default function to close the Modal
        onRequestClose={handleCloseBottomSheet}
      >
        <View style={[styles.bottomSheet, { height: windowHeight * 0.6 }]}>
          <View
            style={{
              flex: 0,
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <SubText
              text={"Preview"}
              family={"sans-serif-medium"}
              size={16}
              color={"#86827e"}
            />
            <TouchableOpacity onPress={handleCloseBottomSheet}>
              <Icon name="times" size={32} />
            </TouchableOpacity>
          </View>

          <View style={{ paddingVertical: 16 }}>
            <SubText
              text={"Unyime Emmanuel"}
              family={"sans-serif"}
              color={"#292929"}
              size={18}
            />
            <SubText
              text={`I'm a Software Engineer and Technical Writer, I've had the TypeScript epiphany!. Oh, I play Chess too!`}
              family={"sans-serif"}
              color={"#86827e"}
              size={14}
            />

            <View
              style={{
                opacity: 0.2,
                height: 1,
                borderWidth: 1,
                borderColor: "#86827e",
                marginVertical: 16,
              }}
            />
            <View
              style={{
                flex: 0,
                justifyContent: "flex-start",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <SubText
                text={"24"}
                color={"#292929"}
                family={"sans-serif"}
                size={24}
              />
              <SubText
                text={" articles written"}
                color={"#86827e"}
                size={14}
                family={"sans-serif-medium"}
              />
            </View>

            <View style={{ paddingTop: 16 }}>
              <SubText
                text={"Views (30 days)"}
                color={"#86827e"}
                size={12}
                family={"sans-serif-medium"}
              />
              <SubText
                text={"4,904"}
                color={"#292929"}
                family={"sans-serif"}
                size={18}
              />
            </View>

            <View style={{ paddingTop: 16 }}>
              <SubText
                text={"Views (30 days)"}
                color={"#86827e"}
                size={12}
                family={"sans-serif-medium"}
              />
              <SubText
                text={"4,904"}
                color={"#292929"}
                family={"sans-serif"}
                size={18}
              />
            </View>

            <View style={{ paddingTop: 16 }}>
              <SubText
                text={"Reads (30 days)"}
                color={"#86827e"}
                size={12}
                family={"sans-serif-medium"}
              />
              <SubText
                text={"3038"}
                color={"#292929"}
                family={"sans-serif"}
                size={18}
              />
            </View>

            <View style={{ paddingTop: 16, flex: 0, flexDirection: "row" }}>
              {/* <Image source={require("assets/icons/map-marker-alt.png")} /> */}
              <View style={{ paddingLeft: 12 }} />
              <SubText
                text={"Medium"}
                color={"#86827e"}
                size={14}
                family={"sans-serif-medium"}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BottomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 23,
    paddingHorizontal: 25,
    bottom: 0,
    borderWidth: 1,
    borderColor: "red",
  },
});
