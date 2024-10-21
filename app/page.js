"use client"
import LoginPage from "./components-app/loginPage";

export default function HomePage() {
  return (
    <div>
      <LoginPage />
    </div>
  );
}

// 'use client'

// import { useRouter } from 'next/navigation'

// export default function Page() {
//   const router = useRouter()

//   return (
//     <button type="button" onClick={() => router.push('/dashboard')}>
//       Dashboard
//     </button>
//   )
// }