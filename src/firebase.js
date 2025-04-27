// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAXJXHr-xUGEhTwdbs4tYndqdDBKbBBISY",

  authDomain: "react-project-5bd7e.firebaseapp.com",

  projectId: "react-project-5bd7e",

  storageBucket: "react-project-5bd7e.firebasestorage.app",

  messagingSenderId: "1017078547570",

  appId: "1:1017078547570:web:96e5185cf2b96a505b2eeb"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
