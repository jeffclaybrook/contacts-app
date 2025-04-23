"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { formatPhoneInput } from "@/lib/utils"
import { Email, Name, Phone } from "./icons"
import Link from "next/link"

type FormProps = {
 initialData?: {
  name: string
  phone: string
  email: string
 }
}

export default function Form({ initialData }: FormProps) {
 const { pending } = useFormStatus()

 const [name, setName] = useState(initialData?.name || "")
 const [phone, setPhone] = useState(initialData?.phone || "")
 const [email, setEmail] = useState(initialData?.email || "")

 return (
  <>
   <div className="flex items-center w-full relative">
    <Name className="text-gray-400 dark:text-slate-50 absolute inset-y-[13px] left-2 pointer-events-none" />
    <input
     type="text"
     placeholder="Name"
     name="name"
     value={name}
     onChange={e => setName(e.target.value)}
     required
     className="w-full border border-slate-200 rounded-md px-4 pl-10 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:text-slate-50"
    />
   </div>
   <div className="flex items-center w-full relative">
    <Phone className="text-gray-400 dark:text-slate-50 absolute inset-y-[13px] left-2 pointer-events-none" />
    <input
     type="text"
     placeholder="Phone"
     name="phone"
     value={phone}
     onChange={e => setPhone(formatPhoneInput(e.target.value))}
     required
     className="w-full border border-slate-200 rounded-md px-4 pl-10 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:text-slate-50"
    />
   </div>
   <div className="flex items-center w-full relative">
    <Email className="text-gray-400 dark:text-slate-50 absolute inset-y-[13px] left-2 pointer-events-none" />
    <input
     type="email"
     placeholder="Email"
     name="email"
     value={email}
     onChange={e => setEmail(e.target.value)}
     required
     className="w-full border border-slate-200 rounded-md px-4 pl-10 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:text-slate-50"
    />
   </div>
   <div className="flex items-center justify-end gap-4">
    <Link
     href={"/"}
     aria-label="Cancel"
     className="text-gray-500 cursor-pointer transition hover:text-gray-700 px-4 py-2"
    >
     Cancel
    </Link>
    <button
     type="submit"
     aria-label="Save"
     disabled={pending}
     className="bg-sky-800 text-white p-2 lg:px-8 rounded-lg shadow-lg cursor-pointer hover:bg-sky-950 transition"
    >
     {pending ? "Saving..." : "Save"}
    </button>
   </div>
  </>
 )
}