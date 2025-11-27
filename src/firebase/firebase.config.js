// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_apiKey,
//   authDomain: import.meta.env.VITE_authDomain,
//   projectId: import.meta.env.VITE_projectId,
//   storageBucket: import.meta.env.VITE_storageBucket,
//   messagingSenderId: import.meta.env.VITE_messagingSenderId,
//   appId: import.meta.env.VITE_appId,
// };
const firebaseConfig = {
  apiKey: "AIzaSyCyilcRGqFTlD6m7u_1yKxyfSeBIvS1YEQ",
  authDomain: "zap-sift-fontend.firebaseapp.com",
  projectId: "zap-sift-fontend",
  storageBucket: "zap-sift-fontend.firebasestorage.app",
  messagingSenderId: "226050020820",
  appId: "1:226050020820:web:47d0791fdbc8d79f1b7241"
};

// console.log("Loaded API Key:", import.meta.env.VITE_apiKey);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

