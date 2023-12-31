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
  User,
  NextOrObserver,
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
  QueryDocumentSnapshot,
} from "firebase/firestore";

import { Category } from "../../store/categories/categories.types";
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
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signinWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);
/**********Google *****************/

export const db = getFirestore();

export type ObejctToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObejctToAdd>(
  collectionKey: string,
  jsonObjectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  jsonObjectsToAdd.forEach((jsonObject) => {
    const docRef = doc(collectionRef, jsonObject.title.toLowerCase());
    batch.set(docRef, jsonObject);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  //for testing error
  //await Promise.reject(new Error('whoop we received an error));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );

  // const categoryMap = querySnapshot.docs.reduce((accumalator, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();
  //   accumalator[title.toLowerCase()] = items;
  //   return accumalator;
  // }, {});

  // return categoryMap;
};

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};
//get data from authentication service and store data
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
      console.log("error creating the user", error);
    }
  }

  //return userDocRef;
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

//open listener for auth state changes, after auth state change, callback is then invoked
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback); //returns function to unsubscribe

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
