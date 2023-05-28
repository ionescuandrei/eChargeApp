import React, { useState } from "react";
import { Pressable, Text, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function AvatarPickPhoto() {
  const [image, setImage] = useState(
    "https://mui.com/static/images/avatar/1.jpg"
  );

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  //   pickImageHandler = () => {
  //     ImagePicker.showImagePicker(
  //       { title: "Pick an image", maxHeight: 800, maxWidth: 600 },
  //       res => {
  //         if (res.didCancel) {
  //           console.log("User Canceled");
  //         } else if (res.error) {
  //           console.log("error");
  //         } else {
  //           this.setState({
  //             pickedImage: { uri: res.uri }
  //           });
  //           this.props.onImagePicked({ uri: res.uri, base64: res.data });
  //         }
  //       }
  //     );
  //   };
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      {image && <Image source={{ uri: image }} style={styles.avatar} />}
      <View>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={pickImage}
        >
          <Text style={styles.textStyle}>Edit</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  header: {
    height: 140,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 0,
    alignSelf: "center",
    position: "absolute",
    marginTop: 10,
  },
  button: {
    borderRadius: 20,
    padding: 5,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#009387",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
