const firebaseConfig = {
  apiKey: "AIzaSyAC81KgIXk7kR3KA0R624moMsM73A7y0dY",
  authDomain: "rl-intelligence-round.firebaseapp.com",
  projectId: "rl-intelligence-round",
  storageBucket: "rl-intelligence-round.firebasestorage.app",
  messagingSenderId: "23877867155",
  appId: "1:23877867155:web:a9a461fc13a35716335f66",
  measurementId: "G-YTVFK3GL9N"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function saveResult(data) {
  db.collection("rl-intelligence-results").add(data);
}