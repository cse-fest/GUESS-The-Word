// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBV_T5N0FGYAzT7vt4kQYhMKuPG5HZNViQ",
    authDomain: "pupc-56519.firebaseapp.com",
    projectId: "pupc-56519",
    storageBucket: "pupc-56519.firebasestorage.app",
    messagingSenderId: "672053846344",
    appId: "1:672053846344:web:a0910be10972e6f34e137d",
    measurementId: "G-HG6TS37EYX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();
