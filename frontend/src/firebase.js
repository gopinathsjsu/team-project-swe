// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQgsvLAgMRAnATovW6LnOjqU5maQH9ias",
  authDomain: "test-238ce.firebaseapp.com",
  projectId: "test-238ce",
  storageBucket: "test-238ce.appspot.com",
  messagingSenderId: "689370855169",
  appId: "1:689370855169:web:58cf934b5a3882a9298d00",
  measurementId: "G-LE2PW2HH62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
