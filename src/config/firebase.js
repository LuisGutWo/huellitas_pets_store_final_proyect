import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBZKkJq26vKF0Mxr5sTDOdfdVTKsm30h3g",
    authDomain: "login-huellitas.firebaseapp.com",
    projectId: "login-huellitas",
    storageBucket: "login-huellitas.appspot.com",
    messagingSenderId: "242266180522",
    appId: "1:242266180522:web:466db61143f2f5b7f5f9d3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const login = ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const register = ({ email, password }) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
    return signOut(auth);
};