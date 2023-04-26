import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { ref, onValue, get } from 'firebase/database';
import { database } from "../config/firebase";

const TestResults = () => {
  const [data, setData] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const dbRef = ref(database, '/AlcoholTest/mgL');
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
        animate();
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const animate = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>YOUR BAC LEVEL IS</Text>
      <Animated.View style={{opacity: fadeAnim}}>
        <Text style={styles.text}>{data}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#azure',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
});

export default TestResults;
