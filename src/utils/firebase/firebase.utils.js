import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

//getDoc - get document data
//setDoc - set document data to set data
//doc - get document instance to access data

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-dixi8-rv-gKhhLZZNprN4R0_ZFU7XAQ",
  authDomain: "crwn-clothing-db-b150d.firebaseapp.com",
  projectId: "crwn-clothing-db-b150d",
  storageBucket: "crwn-clothing-db-b150d.appspot.com",
  messagingSenderId: "378000436377",
  appId: "1:378000436377:web:aa4726b00c8870ce2c1c08",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const siginWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

//get data from authentication service and store data
export const createUserDocumentFromAuth = async (userAuth) => {
  //does user document reference exist
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
