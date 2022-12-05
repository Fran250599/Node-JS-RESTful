const firebase = require("firebase-admin");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

const firebaseConfig = {
  apiKey: "AIzaSyAZZb-sef_XZTmgy8clBrMDs0Kol5I57d8",
  authDomain: "nodejs-crud-d6be5.firebaseapp.com",
  projectId: "nodejs-crud-d6be5",
  storageBucket: "nodejs-crud-d6be5.appspot.com",
  messagingSenderId: "73298373263",
  appId: "1:73298373263:web:b1306fe322a5aca7f9defa",
  measurementId: "G-RJXZH28H81",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = firebase.firestore();

const User = db.collection("Users");
module.exports = User;
