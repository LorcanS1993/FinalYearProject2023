// import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

function LoginScreen({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text>Lorcan Stakem</Text>
        </View>
    <Image style={styles.image} source={require("./assets/ProjectLogo.png")} />
    <View style={styles.title}> 
    <Text>Welcome</Text>
    </View>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Register Here</Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.loginText}>LOGIN</Text> 
      </TouchableOpacity> 
    </View> 
  );
}

function Dashboard({ navigation }) {
  return (
    <View style={styles.DBcontainer}>
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.dashboard_button} > 
      <Button title="Test" color="red" onPress={() => navigation.navigate('LoginScreen')} />
      </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.dashboard_button} > 
      <Button title="Test" color="grey" onPress={() => navigation.navigate('LoginScreen')} />
      </TouchableOpacity>
       </View>
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.dashboard_button} > 
      <Button title="Test" color="blue" onPress={() => navigation.navigate('LoginScreen')} />
      </TouchableOpacity>
    </View>
    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity style={styles.dashboard_button} > 
      <Button title="GitHub Account for Project Code" color="green" onPress={() => WebBrowser.openBrowserAsync('https://github.com/LorcanS1993/FinalYearProject2023')}/> 
      </TouchableOpacity>
    </View>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  DBcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginTop: 100,
    width: 410,
    height: 150,
    borderRadius: 30,
    borderColor: 'red',
    borderWidth: 8,
    marginBottom: 30
  },
  heading: {
    height: 55,
    alignItems: 'center',
    backgroundColor: "#fff",
    flexDirection: 'row'

  },

  title: {
   marginBottom: 55,
    fontSize: 30,
    fontWeight: 'bold',
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
    fontWeight: 'bold',

  },

  dashboard_button: {
    marginTop: 100,
    width: 200,
    borderRadius: 20,
    height: 100,
    margin: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
    backgroundColor: "white",
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
    fontWeight: 'bold',
    color: 'white',
  },
});