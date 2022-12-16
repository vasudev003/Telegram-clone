import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCP99ZVmJQIXR4ie_hDlcHEnKmfAqyYCWM",
  authDomain: "telegram-cl0ne.firebaseapp.com",
  projectId: "telegram-cl0ne",
  storageBucket: "telegram-cl0ne.appspot.com",
  messagingSenderId: "424257989759",
  appId: "1:424257989759:web:2fa3b27163ca29a8f7e34a",
  measurementId: "G-ZTJVWFVJG0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();

export { auth, provider };
export default db;
