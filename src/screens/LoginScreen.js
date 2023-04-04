import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { Text, TextInput } from "@react-native-material/core";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useTheme, useNavigation } from "@react-navigation/native";
import { emailValidator } from "../utility/validation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
const LoginScreen = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidEmail: true,
    isValidPassword: true,
  });
  const navigation = useNavigation();

  const { colors } = useTheme();

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidEmail: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    const isEmailVal = emailValidator(val);
    if (isEmailVal) {
      setData({
        ...data,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        isValidEmail: false,
      });
    }
  };

  const loginHandle = (email, password) => {
    if (data.email.length == 0 || data.password.length == 0) {
      Alert.alert("Wrong Input!", "email or password field cannot be empty.", [
        { text: "Okay" },
      ]);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Invalid User!", "email or password is incorrect.", [
          { text: "Okay" },
        ]);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Your email"
            placeholderTextColor="#666666"
            color="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <View>
              <Feather name="check-circle" color="green" size={20} />
            </View>
          ) : null}
        </View>
        {data.isValidEmail ? null : (
          <View>
            <Text style={styles.errorMsg}>Please enter a valid email.</Text>
          </View>
        )}

        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <View>
            <Text style={styles.errorMsg}>
              Password must be 6 characters long.
            </Text>
          </View>
        )}

        <TouchableOpacity>
          <Text style={{ color: "#009387", marginTop: 15 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              loginHandle(data.email, data.password);
            }}
          >
            <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.signIn}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("CarUserScreen")}
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
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default LoginScreen;
// import { useState } from "react";
// import { SafeAreaView, TouchableOpacity } from "react-native";
// import { StyleSheet } from "react-native";
// import {
//   Text,
//   TextInput,
//   VStack,
//   HStack,
//   Button,
// } from "@react-native-material/core";
// import { useNavigation } from "@react-navigation/native";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../redux/authSlice";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import auth from "../firebase-config";

// const LoginScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const handleLogin = () => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         console.log(user);
//         navigation.navigate("TabNav");
//         // ...
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//       });
//   };
//   return (
//     <SafeAreaView style={{ paddingTop: 150 }}>
//       <VStack spacing={6} style={{ padding: 10 }}>
//         <VStack spacing={1} alignItems="center">
//           <Text variant="h4">Welcome</Text>
//         </VStack>
//         <VStack spacing={2}>
//           <TextInput
//             label="Email"
//             variant="outlined"
//             value={email}
//             onChangeText={setEmail}
//           />
//           <TextInput
//             secureTextEntry
//             label="Password"
//             variant="outlined"
//             value={password}
//             onChangeText={setPassword}
//           />
//         </VStack>
//         <HStack justify="center">
//           <Button title="Login" compact onPress={handleLogin} />
//         </HStack>
//         <Text>
//           <TouchableOpacity
//             onPress={() => navigation.navigate("RegisterScreen")}
//           >
//             <Text>Don't have an account?</Text>
//           </TouchableOpacity>
//         </Text>
//       </VStack>
//     </SafeAreaView>
//   );
// };

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
    flex: 3,
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
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
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
});
