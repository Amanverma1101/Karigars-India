const firebase = require("firebase-admin");
const credentials = require("./key.json");
require('dotenv').config();
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};
// firebase.initializeApp(firebaseConfig);
const ref = firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL:"https://designkoktail-f13c3-default-rtdb.firebaseio.com"
});
// database.initializeApp({
//   credential: firebase.credential.cert(credentials),
//   databaseURL:"https://designkoktail-f13c3-default-rtdb.firebaseio.com"
// });
const db = firebase.firestore();

// const Task = db.collection("Tasks");
// const Credential = db.collection("Cresentials");
module.exports = {db};
