"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { ArrowDown, ArrowUp } from "./icons"

export default function SortToggle() {
 const router = useRouter()
 const pathname = usePathname()
 const searchParams = useSearchParams()

 const currentSort = searchParams.get("sort") || "asc"

 const toggleSort = () => {
  const params = new URLSearchParams(searchParams.toString())
  const nextSort = currentSort === "asc" ? "desc" : "asc"
  params.set("sort", nextSort)
  router.replace(`${pathname}?${params.toString()}`)
 }

 return (
  <button
   onClick={toggleSort}
   aria-label="Toggle sort"
   className="cursor-pointer"
  >
   {currentSort === "asc" ? <ArrowDown className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />}
  </button>
 )
}