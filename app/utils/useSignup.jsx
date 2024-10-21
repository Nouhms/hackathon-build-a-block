import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/index";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export async function handleSignUp(username, password) {
  let isExists = false;
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    isExists = true;
  });

  if (!isExists) {
    await createUserWithEmailAndPassword(auth, username, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        const id = user.uid;
        console.log("yey signed up");

        const docRef = doc(db, "users", id);
        const newUserName = user.displayName ?? username;
        await setDoc(docRef, { username: newUserName });
        console.log("added user to db");
        alert("yey signed up");
        return;
      })
      .catch((error) => {
        // ..
      });
    alert(
      "Input should be a valid email and password must be more than 5 characters"
    );
    return;
  }
  alert("The account is already registered. Please proceed to log in");
  //handle user already exists
}
