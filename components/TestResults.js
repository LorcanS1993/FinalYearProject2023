import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { firebase } from '@react-native-firebase/database';

const TestResults = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const dbRef = firebase.database().ref('/AlcoholTest/mgL');
    dbRef.on('value', snapshot => {
      setData(snapshot.val());
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data.result}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TestResults;
