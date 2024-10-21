import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/auth";

async function handleLogIn(username, password) {
  let isValid = false;
  await signInWithEmailAndPassword(auth, username, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("yey you exist");
      console.log(user.uid);
      isValid = true;
    })
    .catch((error) => {
      //handle wrong username or password
      console.log("oy error " + error);
      alert("Invalid email or password");
    });

  return isValid;
}

export default handleLogIn;
