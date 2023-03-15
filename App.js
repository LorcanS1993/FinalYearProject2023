// import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, Pressable, FlatList } from "react-native";
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
      <Button title="Test Yourself" color="red" onPress={() => navigation.navigate('TestResults')} />
      </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.dashboard_button} > 
      <Button title="Drink Driving Limits" color="grey" onPress={() => navigation.navigate('Information')} />
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

const TestResults = () => {
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

const Information = () => {
  const data = [
    {
      id: '1',
      image: 'https://cdn1.iconfinder.com/data/icons/fast-food-cafe-colored/96/cider_apple_drinks_craft_96-512.png',
      title: 'Cider',
      subtitle: 'Standard 4.5%'
    },
    {
      id: '2',
      image: 'https://i.pinimg.com/736x/e5/2b/95/e52b9559ef1097f46060c9f25f11ae46.jpg',
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


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="TestResults" component={TestResults} />
        <Stack.Screen name="Information" component={Information} />
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

  testcontainer: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: 'blue'
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

  infoContainer: {
    backgroundColor:'#fff'
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