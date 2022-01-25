// import firebase from "firebase";
import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCpnnv4TKtpCu7ElkyAj5Mdm9xXnZa8ChI",
    authDomain: "clone-f7f66.firebaseapp.com",
    projectId: "clone-f7f66",
    storageBucket: "clone-f7f66.appspot.com",
    messagingSenderId: "695013794853",
    appId: "1:695013794853:web:ebdd81ac6dbea0cd1f8bcc",
    measurementId: "G-29YQ6517GL"
  };

// checking if the firebase is already initialized or not and if note then initialize it or use existing one
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const db = app.firestore();


