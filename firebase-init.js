// firebase-init.js

// This is your unique configuration object from the Firebase website.
// It connects this code to your specific Firebase project.
const firebaseConfig = {
  apiKey: "AIzaSyDdc2AmMlBI-jIga7DYLm6-JQHWmPB_lFQ",
  authDomain: "money-77-b09bb.firebaseapp.com",
  projectId: "money-77-b09bb",
  storageBucket: "money-77-b09bb.firebasestorage.app",
  messagingSenderId: "1006522444365",
  appId: "1:1006522444365:web:0b5f093f43b4c7368c8a04",
  measurementId: "G-NLLQRDZW5W"
};


// --- INITIALIZE FIREBASE ---
// This line uses your keys to establish the connection.
firebase.initializeApp(firebaseConfig);


/*
====================================================================
  IMPORTANT: APP CHECK SECURITY IS SKIPPED FOR EASIER SETUP
====================================================================
*/


// --- Make Firebase services globally available for all other scripts ---
const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();
const storage = firebase.storage();