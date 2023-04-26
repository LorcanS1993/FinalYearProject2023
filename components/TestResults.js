import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ref, onValue, get } from 'firebase/database';
import { database } from "../config/firebase";

const TestResults = () => {
  const [data, setData] = useState(0);

  useEffect(() => {
    const dbRef = ref(database, '/AlcoholTest/mgL');
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data}</Text>
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

