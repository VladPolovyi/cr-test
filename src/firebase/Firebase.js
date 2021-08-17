import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "crtest-66550.firebaseapp.com",
  projectId: "crtest-66550",
  storageBucket: "crtest-66550.appspot.com",
  messagingSenderId: "875962370897",
  appId: "1:875962370897:web:6d756b06d80add4ba16170",
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;
