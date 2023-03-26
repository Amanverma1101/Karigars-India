const firebase = require("firebase-admin");
const credentials = require("./key.json");
const firebaseConfig = {
  apiKey: "AIzaSyDoMlriG5ch5Vursn-T1N8MOOtifZlT6LU",
  authDomain: "designkoktail-f13c3.firebaseapp.com",
  projectId: "designkoktail-f13c3",
  storageBucket: "designkoktail-f13c3.appspot.com",
  messagingSenderId: "237876784229",
  appId: "1:237876784229:web:85cdaab127d61f2b0c6a8c",
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
