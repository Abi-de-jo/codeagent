// authUtils.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

// Sign up
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    return error.message;
  }
};

// Log in
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    return error.message;
  }
};

// Log out
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return "Logged out successfully";
  } catch (error) {
    return error.message;
  }
};
