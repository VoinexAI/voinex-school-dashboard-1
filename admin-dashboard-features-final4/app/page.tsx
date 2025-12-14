// "use client"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"

// export default function Home() {
//   const router = useRouter()

//   useEffect(() => {
//     const token = localStorage.getItem("authToken")
//     if (token) {
//       router.push("/dashboard")
//     } else {
//       router.push("/login")
//     }
//   }, [router])

//   return null
// }

// "use client"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"

// export default function Home() {
//   const router = useRouter()

//   useEffect(() => {
//     const token = localStorage.getItem("authToken")
//     router.replace(token ? "/dashboard" : "/login")
//   }, [router])

//   return <p>Redirecting...</p>
// }

"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Prevent redirect loop
    if (pathname !== "/") return

    const redirect = async () => {
      try {
        const token = localStorage.getItem("authToken")
        const targetRoute = token ? "/dashboard" : "/login"
        
        console.log("[Home] Redirecting to:", targetRoute)
        
        // Use push instead of replace for debugging
        await router.push(targetRoute)
      } catch (error) {
        console.error("[Home] Navigation error:", error)
        // Force navigation to login on error
        window.location.href = "/login"
      }
    }

    redirect()
  }, [router, pathname])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  )
}