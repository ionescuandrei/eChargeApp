import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0n_TgWPb7N63AdyYyQdRTVY5nQ50GP1I",
  authDomain: "echarge-ef0d2.firebaseapp.com",
  projectId: "echarge-ef0d2",
  storageBucket: "echarge-ef0d2.appspot.com",
  messagingSenderId: "162129721166",
  appId: "1:162129721166:web:ff8d49e7cc6ffb8eba101f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
