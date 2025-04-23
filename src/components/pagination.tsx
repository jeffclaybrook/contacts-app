"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { pagination } from "@/lib/pagination"
import { ChevronLeft, ChevronRight } from "./icons"
import Link from "next/link"
import clsx from "clsx"

type PaginationNumberProps = {
 page: number | string
 href: string
 position?: "first" | "last" | "middle" | "single"
 isActive: boolean
}

type PaginationArrowProps = {
 href: string
 direction: "left" | "right"
 isDisabled?: boolean
}

type PaginationProps = {
 totalPages: number
}

function PaginationNumber({ page, href, position, isActive }: PaginationNumberProps) {
 const className = clsx(
  "p-2 rounded-full",
  {
   "mr-2": position === "first" || position === "single",
   "ml-2": position === "last" || position === "single",
   "text-slate-700 dark:text-slate-50": isActive,
   "hover:bg-gray-100": !isActive && position !== "middle",
   "text-gray-300 pointer-events-none": position === "middle"
  }
 )

 return isActive && position === "middle" ? (
  <div className={className}>{page}</div>
 ) : (
  <Link href={href} className={className}>{page}</Link>
 )
}

function PaginationArrow({ href, direction, isDisabled }: PaginationArrowProps) {
 const className = clsx(
  "p-2 rounded-full",
  {
   "pointer-events-none text-gray-300": isDisabled,
   "hover:bg-gray-100": !isDisabled,
   "mr-2": direction === "left",
   "ml-2": direction === "right"
  }
 )

 const icon = direction === "left" ? (
  <ChevronLeft />
 ) : (
  <ChevronRight />
 )

 return isDisabled ? (
  <div className={className}>{icon}</div>
 ) : (
  <Link href={href} className={className}>{icon}</Link>
 )
}

export default function Pagination({ totalPages }: PaginationProps) {
 const pathname = usePathname()
 const searchParams = useSearchParams()
 const currentPage = Number(searchParams.get("page")) || 1
 const allPages = pagination(currentPage, totalPages)

 const createPageUrl = (pageNumber: string | number) => {
  const params = new URLSearchParams(searchParams)
  params.set("page", pageNumber.toString())
  return `${pathname}?${params.toString()}`
 }

 return (
  <div className="inline-flex">
   <PaginationArrow
    direction="left"
    href={createPageUrl(currentPage - 1)}
    isDisabled={currentPage <= 1}
   />
   <div className="flex -space-x-px">
    {allPages.map((page, i) => {
     let position: "first" | "last" | "single" | "middle" | undefined
     if (i === 0) position = "first"
     if (i === allPages.length - 1) position = "last"
     if (allPages.length === 1) position = "single"
     if (page === "...") position = "middle"
     return (
      <PaginationNumber
       key={i}
       href={createPageUrl(page)}
       page={page}
       position={position}
       isActive={currentPage === page}
      />
     )
    })}
   </div>
   <PaginationArrow
    direction="right"
    href={createPageUrl(currentPage + 1)}
    isDisabled={currentPage >= totalPages}
   />
  </div>
 )
}