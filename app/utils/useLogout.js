import { auth, unsubscribeObserver } from "../firebase/auth";
import { signOut } from "firebase/auth";

function handleLogOut() {
    signOut(auth).then(() => {
        //do stuff here if needed 
        console.log("user logged out");
        unsubscribeObserver()

        //route to home
    }).catch((error) => {
        //do stuff when error happens
        console.log(error);

    })
}

export default handleLogOut;