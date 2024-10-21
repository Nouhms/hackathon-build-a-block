import React from "react";
import { useRouter } from "next/navigation";

export default function Test() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.push("/")}>
      return to home
    </button>
  );
}
