import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail
} from "firebase/auth";

const {
    REACT_APP_FIREBASE_KEY,
    REACT_APP_FIREBASE_AUTH_DOMAIN,
    REACT_APP_FIREBASE_PROJECT_ID,
    REACT_APP_FIREBASE_STORAGE_BUCKET,
    REACT_APP_FIREBASE_SENDER_ID,
    REACT_APP_FIREBASE_APP_ID,
    REACT_APP_FIREBASE_MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_KEY,
    authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
    appId: REACT_APP_FIREBASE_APP_ID,
    measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);

const signOutUser = () => firebaseAuth.signOut();

const authUserLogin = async (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
}

export {
    authUserLogin,
    firebaseAuth,
    signOutUser,
    onAuthStateChanged,
    sendPasswordResetEmail,
};