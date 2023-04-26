// import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator, Button, Alert, Pressable, FlatList, Animated } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth, updateEmail } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

import Dashboard from "../components/Dashboard";
import TestResults from "../components/TestResults";
import Information from "../components/Information";
import AccountLogin from "../components/AccountLogin";
import RegisterScreen from "../components/RegisterScreen";
import { login } from "../redux/actions/authActions";

const Stack = createNativeStackNavigator();

function LoginScreen({ navigation }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const loginError = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const auth = getAuth();
    if (auth?.currentUser) {
      setLoading(false);
      navigation.navigate("Dashboard");
    }
  }, [user]);

  useEffect(() => {
    console.log(loginError);
    if (loginError) {
      setLoading(false);
      Alert.alert("Error", "Email or password invalid.");
    }
  }, [loginError]);

  const handleLogin = () => {
    setLoading(true);
    dispatch(login(email, password));
  };

  useEffect(() => {
    Animated.spring(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/ProjectLogo.png")}
      />
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.Welcometitle}>Welcome</Text>
      </Animated.View>
      <StatusBar style="auto" />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setEmail(email)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.forgot_button}>Register Here</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="TestResults" component={TestResults} />
        <Stack.Screen name="Information" component={Information} />
        <Stack.Screen name="AccountLogin" component={AccountLogin} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "azure",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginTop: 100,
    width: 410,
    height: 150,
    borderRadius: 30,
    borderColor: "red",
    borderWidth: 8,
    marginBottom: 30,
  },
  heading: {
    height: 55,
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
  },

  title: {
    marginBottom: 55,
    fontSize: 30,
    fontWeight: "bold",
  },

  inputView: {
    backgroundColor: "#add8e6",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 40,
    marginBottom: 20,
    fontWeight: "bold",
  },
  Welcometitle: {
    marginBottom: 55,
    fontSize: 30,
    fontWeight: "bold",
  },  
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    backgroundColor: "#191970",
  },
  loginText: {
    fontWeight: "bold",
    color: "white",
  },
});
