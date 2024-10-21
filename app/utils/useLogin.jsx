import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/auth";

async function handleLogIn(username, password) {
  let user;
  await signInWithEmailAndPassword(auth, username, password)
    .then(async (userCredential) => {
      // Signed in
      user = userCredential.user;
      console.log("yey you exist");
      console.log(user.uid);
    })
    .catch((error) => {
      console.log("Error detected");
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      //handle wrong username or password
    });
}

export default handleLogIn;
