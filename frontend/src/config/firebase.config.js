import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSASEND_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,

  // apiKey: "AIzaSyDH4kohbZcvVA29VGhiuHvTar5BdifdVPE",
  // authDomain: "music-app-mern-stack.firebaseapp.com",
  // projectId: "music-app-mern-stack",
  // storageBucket: "music-app-mern-stack.appspot.com",
  // messagingSenderId: "906063890425",
  // appId: "1:906063890425:web:bf9274211cdfcf4cb6df28",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
