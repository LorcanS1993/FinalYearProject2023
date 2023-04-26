import { initializeApp } from "firebase/app";
import Constants from "expo-constants";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.firebaseApiKey,
  authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
  projectId: Constants.manifest?.extra?.firebaseProjectId,
  storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
  databaseURL: Constants.manifest?.extra?.firebaseDatabaseURL,
  messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
  appId: Constants.manifest?.extra?.firebaseAppId,
};

const firebaseConfig2 = {
  apiKey: "AIzaSyAz7X7ptzblcrEoLICDXHsYe3D5N19sW60",
  authDomain: "fir-connect1993.firebaseapp.com",
  databaseURL: "https://fir-connect1993-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-connect1993",
  storageBucket: "fir-connect1993.appspot.com",
  messagingSenderId: "46357520434",
  appId: "1:46357520434:web:90d7d085da52e51e71dc2b",
  measurementId: "G-DKSYQ43XHH"
};

const app = initializeApp(firebaseConfig);
const app2 = initializeApp(firebaseConfig2, "secondary");

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app2);

export { auth, db, storage, database };
