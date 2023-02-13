// authActions.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseConfig } from "../firebase-config";
// Initialize Firebase
import { createAsyncThunk } from "@reduxjs/toolkit";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log("User created");
        const user = userCredentials.user;
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
