import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

///SOLUCIÓN DE WARNING
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDqSLoTlciPeJ7Gzzabk9IUXZPymXNIjao",
  authDomain: "app3-2276a.firebaseapp.com",
  databaseURL: "https://app3-2276a-default-rtdb.firebaseio.com",
  projectId: "app3-2276a",
  storageBucket: "app3-2276a.appspot.com",
  messagingSenderId: "378212107166",
  appId: "1:378212107166:web:87de35c0b3d07a5e620c8f"
};

const app = initializeApp(firebaseConfig);
//export const auth = getAuth(app)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const storage = getStorage(app)
