// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB08BYlkkkpi_xqy8WGOG-mwaoiCdTrCU4",
  authDomain: "online-c3cd3.firebaseapp.com",
  projectId: "online-c3cd3",
  storageBucket: "online-c3cd3.appspot.com",
  messagingSenderId: "882690997647",
  appId: "1:882690997647:web:2ff00e235220d47bbc9ffa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};