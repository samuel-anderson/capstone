import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
//interface layer functions

//getDoc - get document data
//setDoc - set document data to set data
//doc - get document instance to access data

/*
seperation layer between front end and services
clearly defining where interaction is taking place with the service
refactoring occurs in one location
protect our front end application from external service that's subject to change

*/

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
//const firebaseApp = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

//can have multiple providers
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(); //singleton, authentication memory base

/**********Google *****************/
export const siginWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signinWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);
/**********Google *****************/

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  jsonObjectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  jsonObjectsToAdd.forEach((jsonObject) => {
    const docRef = doc(collectionRef, jsonObject[field].toLowerCase());
    batch.set(docRef, jsonObject);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

  // const categoryMap = querySnapshot.docs.reduce((accumalator, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();
  //   accumalator[title.toLowerCase()] = items;
  //   return accumalator;
  // }, {});

  // return categoryMap;
};

//get data from authentication service and store data
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

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
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

//open listener for auth state changes, after auth state change, callback is then invoked
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback); //returns function to unsubscribe
