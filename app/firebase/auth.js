import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { app } from "./index";
import { useRouter } from "next/navigation";


export const auth = getAuth(app);
export const unsubscribeObserver = onAuthStateChanged(auth, (user) => {
    console.log("user state changed!");

    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log("hello " + user.email + " from auth state change");

        // ...
    } else {
        // User is signed out
        // ...
    }
});
