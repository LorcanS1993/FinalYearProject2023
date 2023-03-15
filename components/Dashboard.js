// import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, Pressable, FlatList } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Dashboard({ navigation }) {
  return (
    <View style={styles.DBcontainer}>
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.dashboard_button} > 
      <Button title="Test Yourself" color="red" onPress={() => navigation.navigate('TestResults')} />
      </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.dashboard_button} > 
      <Button title="Standard Drink Limits" color="grey" onPress={() => navigation.navigate('Information')} />
      </TouchableOpacity>
       </View>
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.dashboard_button} > 
      <Button title="Login Details" color="blue" onPress={() => navigation.navigate('AccountLogin')} />
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

const styles = StyleSheet.create({
  DBcontainer: {
    flex: 1,
    backgroundColor: "azure",
    alignItems: "center",
    justifyContent: "center",
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
});