"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { UserButton } from "@clerk/nextjs"
import { Dark, Light, Logo, Search } from "./icons"
import Link from "next/link"

export default function Navbar() {
 const [theme, setTheme] = useState<"light" | "dark">("light")
 const searchParams = useSearchParams()
 const pathname = usePathname()
 const { replace } = useRouter()

 useEffect(() => {
  const stored = localStorage.getItem("theme") as "light" | "dark" | null
  const initialTheme = stored || "light"
  setTheme(initialTheme)
  document.documentElement.setAttribute("data-theme", initialTheme)
 }, [])

 const toggleTheme = () => {
  const newTheme = theme === "dark" ? "light" : "dark"
  setTheme(newTheme)
  localStorage.setItem("theme", newTheme)
  document.documentElement.setAttribute("data-theme", newTheme)
 }

 const handleSearch = useDebouncedCallback((term: string) => {
  const params = new URLSearchParams(searchParams)
  params.set("page", "1")
  if (term) {
   params.set("query", term)
  } else {
   params.delete("query")
  }
  replace(`${pathname}?${params.toString()}`)
 }, 300)

 return (
  <nav className="flex items-center gap-4 p-4">
   <div className="flex-1">
    <Link
     href={"/"}
     aria-label="Home"
     className="text-slate-700 dark:text-slate-50"
    >
     <Logo className="w-10 h-10" />
    </Link>
   </div>
   <div className="flex items-center max-w-lg w-full mx-auto relative">
    <Search className="text-gray-400 dark:text-slate-50 absolute inset-y-[13px] left-2 pointer-events-none" />
    <input
     type="text"
     placeholder="Search..."
     onChange={e => handleSearch(e.target.value)}
     defaultValue={searchParams.get("query")?.toString()}
     className="w-full border border-slate-200 rounded-md px-4 pl-10 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:text-slate-50"
    />
   </div>
   <div className="flex items-center justify-end gap-4 flex-1">
    <button
     onClick={toggleTheme}
     aria-label="Toggle theme"
     className="text-slate-700 dark:text-slate-50 p-2 rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition"
    >
     {theme === "dark" ? <Light /> : <Dark />}
    </button>
    <UserButton />
   </div>
  </nav>
 )
}