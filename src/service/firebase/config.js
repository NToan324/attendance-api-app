import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDO1v1OSEiuBMQyvjHmpSVRPFgRB4w9zXQ",
  authDomain: "attendance-app-5c37a.firebaseapp.com",
  projectId: "attendance-app-5c37a",
  storageBucket: "attendance-app-5c37a.appspot.com",
  messagingSenderId: "977782921052",
  appId: "1:977782921052:web:84875739840a89a8969399",
  measurementId: "G-DDT52TJ2EK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
