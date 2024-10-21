import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyAvbSSa--AwVotPaF8qZRUdMmrBi-khlAk",
    authDomain: "hackathon-build-a-block.firebaseapp.com",
    projectId: "hackathon-build-a-block",
    storageBucket: "hackathon-build-a-block.appspot.com",
    messagingSenderId: "17739393240",
    appId: "1:17739393240:web:09b81e25d3e548a6dd0fad"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);