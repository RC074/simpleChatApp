import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVG0PtInMTclQla1MzeZnHjJceQgtm8m8",
  authDomain: "chat-app-34123.firebaseapp.com",
  databaseURL: "https://chat-app-34123-default-rtdb.firebaseio.com",
  projectId: "chat-app-34123",
  storageBucket: "chat-app-34123.appspot.com",
  messagingSenderId: "569280308056",
  appId: "1:569280308056:web:a17a1ff413aab459157b2d",
};

firebase.initializeApp(firebaseConfig);

export const fb = firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();
