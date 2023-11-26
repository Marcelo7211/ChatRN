import { initializeApp } from "firebase/app";
import {getAuth, initializeAuth, getReactNativePersistence} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';    

const firebaseConfig = {
    apiKey: "AIzaSyCAXhZZy19p5hMnqClT0l7fgWrSwHPXrpM",
    authDomain: "chatreal-f892e.firebaseapp.com",
    projectId: "chatreal-f892e",
    storageBucket: "chatreal-f892e.appspot.com",
    messagingSenderId: "947067495958",
    appId: "1:947067495958:web:1d21928132b5ac01acb737"
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
export const storage = getStorage()
export const database = getFirestore(app)