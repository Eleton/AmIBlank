import firebase from "firebase";

const config = {
  apiKey: "AIzaSyB7gnTrjB6JzAA9X2uEQ3I_OuY4ZbaGqXE",
  authDomain: "am-i-blank.firebaseapp.com",
  databaseURL: "https://am-i-blank.firebaseio.com",
  projectId: "am-i-blank",
  storageBucket: "",
  messagingSenderId: "885879372752",
  appId: "1:885879372752:web:2a5281915af20bd3"
};
firebase.initializeApp(config);
export default firebase;