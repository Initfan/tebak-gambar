import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6kx3MvGfpM16dAyoKdsg98BH_HUdTsKg",
  authDomain: "react-api-cdd1d.firebaseapp.com",
  databaseURL: "https://react-api-cdd1d-default-rtdb.firebaseio.com",
  projectId: "react-api-cdd1d",
  storageBucket: "react-api-cdd1d.appspot.com",
  messagingSenderId: "163318343472",
  appId: "1:163318343472:web:1739384641e6eeda4fcaf5",
  measurementId: "G-DRGRJVX6Y0",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
