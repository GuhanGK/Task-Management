// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyrcdzgCYcc--nqwQAw27_V_RTP-En6Ro",
  authDomain: "social-media-ff562.firebaseapp.com",
  projectId: "social-media-ff562",
  storageBucket: "social-media-ff562.firebasestorage.app",
  messagingSenderId: "97527417556",
  appId: "1:97527417556:web:b77ae5b9bbdcf2befd8941",
  measurementId: "G-D5BWKFYXYB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

export default app;