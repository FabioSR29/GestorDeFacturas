// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbqvdqdEvDa09LhX-fSlTabrWDlwRbcJA",
  authDomain: "tamarindo2-316aa.firebaseapp.com",
  projectId: "tamarindo2-316aa",
  storageBucket: "tamarindo2-316aa.appspot.com",
  messagingSenderId: "919846799510",
  appId: "1:919846799510:web:340f7d4e35dd0a61b8dab7",
  measurementId: "G-5KH2FL96SX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;