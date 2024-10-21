"use client";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleSignUp } from "../utils/useSignup";
import handleLogIn from "../utils/useLogin";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsernameChange(e) {
    setUsername(e.target.value);
    console.log(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    console.log(e.target.value);
  }

  const router = useRouter();

  return (
    <div className="grid justify-items-center">
      <h1>Welcome</h1>
      <div className="flex w-full max-w-sm items-center space-x-2 my-1">
        <Input
          placeholder="Enter your email (ex. juan@yahoo.com)"
          value={username}
          onChange={(e) => handleUsernameChange(e)}
        />
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => handlePasswordChange(e)}
        />
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Button
          type="submit"
          className="flex w-full max-w-sm items-center space-x-2 mt-2 mb-1"
          onClick={async (_) => {
            const isValid = await handleLogIn(username, password);
            if (isValid) router.push("eventsPage");
          }}
        >
          Login
        </Button>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Button
          type="submit"
          className="flex w-full max-w-sm items-center space-x-2 mt-2 mb-1"
          onClick={(_) => handleSignUp(username, password)}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
}
