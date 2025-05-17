import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "linkgenerator-8a161.firebaseapp.com",
  projectId: "linkgenerator-8a161",
  storageBucket: "linkgenerator-8a161.firebasestorage.app",
  messagingSenderId: "582884153118",
  appId: "1:582884153118:web:71993dd541081109071b0f",
  measurementId: "G-MP3GGBDSPD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

