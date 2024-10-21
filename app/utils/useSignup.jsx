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
import { v4 as uuidv4 } from "uuid";

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
      })
      .catch((error) => {
        console.log(
          "dili ka sign up dol (not email or less than 5 char password) " +
            username +
            " " +
            password
        );

        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    return;
  }
  //handle user already exists
}
