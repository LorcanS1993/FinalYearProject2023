import React, { useContext, useEffect, useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/actions/authActions";
import { useToast } from "react-native-toast-message";
import { getAuth, updateEmail } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const signupError = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);

  const isValidEmail = (email) => {
    // Regular expression to match email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    if (!password) {
      return false;
    }
    // Password should be at least 6 characters long
    return password.length >= 6;
  };

  const isValidFullName = (fullName) => {
    // Full name should have at least two words separated by a space
    const fullNameRegex = /^[\w\d]+\s+[\w\d]+$/;
    return fullNameRegex.test(fullName);
  };

  const isFormValid = () => {
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email");
      return false;
    }
    if (!isValidPassword(password)) {
      Alert.alert("Error", "Password should be at least 6 characters long");
      return false;
    }
    if (!isValidFullName(name)) {
      Alert.alert(
        "Error",
        "Please enter your full name with at least two words separated by a space"
      );
      return false;
    }
    return true;
  };

  const handleSignup = () => {
    if (!isFormValid()) {
      return;
    }
    setLoading(true);
    dispatch(signup(email, password, name));
  };

  useEffect(() => {
    const auth = getAuth();
    if (auth?.currentUser) {
      setLoading(false); // set loading state to false on success
      navigation.navigate("Dashboard");
    }
  }, [user]);

  useEffect(() => {
    const auth = getAuth();
    console.log(auth);
    if (auth?.currentUser) {
      setLoading(false); // set loading state to false on success
      navigation.navigate("Dashboard");
    }
  }, []);

  useEffect(() => {
    if (signupError?.includes("auth/email-already-in-use")) {
      setLoading(false);
      Alert.alert("Error", "Email already exists.");
    }
  }, [signupError]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <TextInput
              style={styles.input}
              value={name}
              placeholder="Enter name"
              onChangeText={(text) => setName(text)}
            />

            <TextInput
              style={styles.input}
              value={email}
              placeholder="Enter email"
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              style={styles.input}
              value={password}
              placeholder="Enter password"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />

            <Button title="Register" onPress={handleSignup} />

            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Text>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "azure",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: "80%",
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: "blue",
  },
});

export default RegisterScreen;
