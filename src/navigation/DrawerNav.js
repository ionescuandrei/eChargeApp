import * as React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import TabNav from "./TabNav";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AddCarScreen from "../screens/Drawer/AddCar";
import AddConnector from "../screens/Drawer/AddConnector";
import AddStation from "../screens/Drawer/AddStation";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import Profile from "../screens/Drawer/Profile";
import CarSearch from "../components/CarSearch";

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ route, navigation }) => {
  const DrawerHeaderContent = (props) => {
    return (
      <DrawerContentScrollView contentContainerStyle={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#009387",
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            top: -5,
          }}
        >
          <Text style={{ color: "#fff" }}>eCharge</Text>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          label="               Sign Out"
          onPress={() => signOut(auth).then(() => alert("signed out"))}
        />
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#009387",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerStyle: {
          backgroundColor: "#fff",
        },
      }}
      drawerContent={DrawerHeaderContent}
    >
      <Drawer.Screen
        name={"eCharge App"}
        component={TabNav}
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        initialParams={{ email: route.params.email }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerLabel: "Profile",
          drawerIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name="face-man-profile"
              color={color}
              size={size}
            />
          ),
        }}
        initialParams={{ email: route.params.email }}
      />
      <Drawer.Screen
        name="Add car"
        component={AddCarScreen}
        options={{
          drawerLabel: "Add car",
          drawerIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons name="car" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Add station"
        component={AddStation}
        options={{
          drawerLabel: "Add station",
          drawerIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons name="firewire" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Add connector"
        component={AddConnector}
        options={{
          drawerLabel: "Add connector",
          drawerIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name="location-enter"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="CarSearch"
        component={CarSearch}
        options={{
          drawerLabel: "Search car",
          drawerIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name="location-enter"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 15,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  headerRight: {
    marginRight: 15,
  },
  // drawer content
  drawerLabel: {
    fontSize: 14,
  },
  drawerLabelFocused: {
    fontSize: 14,
    color: "#551E18",
    fontWeight: "500",
  },
  drawerItem: {
    height: 50,
    justifyContent: "center",
  },
  drawerItemFocused: {
    backgroundColor: "#ba9490",
  },
});

export default DrawerNavigator;
