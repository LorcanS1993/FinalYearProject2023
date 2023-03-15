// import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, Pressable, FlatList } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Information({ navigation }) {
  const data = [
    {
      id: '1',
      image: 'https://cdn1.iconfinder.com/data/icons/fast-food-cafe-colored/96/cider_apple_drinks_craft_96-512.png',
      title: 'Cider',
      subtitle: 'Standard 4.5%'
    },
    {
      id: '2',
      image: 'https://static.vecteezy.com/system/resources/previews/018/931/018/original/cartoon-beer-icon-png.png',
      title: 'Beer',
      subtitle: 'Standard 4%'
    },
    {
      id: '3',
      image: 'https://dl2.macupdate.com/images/icons256/17376.png?time=1638440528',
      title: 'Wine',
      subtitle: 'Standard 13%'
    },
    {
      id: '4',
      image: 'https://cdn-icons-png.flaticon.com/128/920/920623.png',
      title: 'Spirits',
      subtitle: 'Standard 40%'
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.infoImage} />
        <View style={styles.textContainer}>
          <Text style={styles.infoTitle}>{item.title}</Text>
          <Text style={styles.subTitle}>{item.subtitle}</Text>
        </View>
      </View>
    );
  };
  return (
    <FlatList data={data} contentContainerStyle={styles.infoContainer}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  
  infoContainer: {
   backgroundColor: "azure", 
  },

  itemContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:  'column' 
  },
  infoImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  textContainer: {
    padding: 16,
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  subTitle: {
    fontSize: 14,
    color: 'gray',
  },
});