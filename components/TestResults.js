// import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, Pressable, FlatList } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function TestResults({ navigation }) {
  const [timesPressed, setTimesPressed] = useState(0);

  let textLog = ''; 
  if (timesPressed > 0) {
  textLog = 'Calculating your BAC Levels...';
  }

  return (
    <View style={styles.testcontainer}>    
    <View style={styles.gaugeheader}>
    <Text>Hello</Text>
    </View>
      <Pressable onPress={() => {
        setTimesPressed(current => current + 1);
        }}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          },
          styles.wrapperCustom,
        ]}>
        {({pressed}) => (
      <Text style={styles.text}>{pressed ? 'Hold for 5 Seconds' : 'Press Here to begin your Breathalyser Test'}</Text>
        )}
      </Pressable>
      <View style={styles.logBox}>
        <Text testID="pressable_press_console">{textLog}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  testcontainer: {
    backgroundColor: "azure",
    flex: 2,
    justifyContent: 'center',
  },

  gaugeheader: {
     flex: 1,
     alignItems: "center",
  },
  
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 30,
    margin: 10,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
});