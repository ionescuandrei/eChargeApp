import getDirections from "../utility/rn-maps-direction";
import React, { Component } from "react";
import { View, Button } from "react-native";
export default class GetDirection extends Component {
  handleGetDirections = () => {
    const data = {
      source: this.props.mylocation,
      destination: this.props.location,
      params: [
        {
          key: "travelmode",
          value: "driving", // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate", // this instantly initializes navigation using the given travel mode
        },
      ],
    };

    getDirections(data);
  };

  render() {
    return (
      <View>
        <Button onPress={this.handleGetDirections} title="Get Directions" />
      </View>
    );
  }
}
