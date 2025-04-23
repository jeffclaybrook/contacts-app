"use client"

import { useEffect, useState } from "react"
import { Contact } from "@prisma/client"
import { formatDistanceToNow } from "date-fns"
import { formatPhoneNumber } from "@/lib/utils"
import { decrypt } from "@/lib/encryption"
import { Edit } from "./icons"
import Link from "next/link"
import DeleteButton from "./delete-button"
import SortToggle from "./sort-toggle"

type TableProps = {
 initialContacts: Contact[]
 formAction: (formData: FormData) => void
}

export default function Table({ initialContacts, formAction }: TableProps) {
 const [contacts, setContacts] = useState(initialContacts)

 useEffect(() => {
  setContacts(initialContacts)
 }, [initialContacts])

 const handleOptimisticDelete = (id: string) => {
  setContacts((prev) => prev.filter((c) => c.id !== id))
 }

 const decryptedContacts = contacts.map((c) => ({
  ...c,
  name: decrypt(c.name),
  phone: decrypt(c.phone),
  email: decrypt(c.email)
 }))

 return (
  <div className="overflow-x-auto">
   <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
     <tr>
      <th scope="col" className="px-6 py-3 flex items-center gap-1">Name <SortToggle /></th>
      <th scope="col" className="px-6 py-3">Phone</th>
      <th scope="col" className="px-6 py-3">Email</th>
      <th scope="col" className="px-6 py-3">Created At</th>
      <th scope="col" className="px-6 py-3">Actions</th>
     </tr>
    </thead>
    <tbody>
     {decryptedContacts.map((contact) => (
      <tr key={contact.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
       <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{contact.name}</th>
       <td className="px-6 py-4">{formatPhoneNumber(contact.phone)}</td>
       <td className="px-6 py-4">{contact.email}</td>
       <td className="px-6 py-4">{formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true })}</td>
       <td className="px-6 py-4 flex gap-4">
        <Link
         href={`/edit/${contact.id}`}
         aria-label="Edit"
         className="text-slate-700 dark:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded-full cursor-pointer transition"
        >
         <Edit />
        </Link>
        <DeleteButton
          contactId={contact.id}
          contactName={contact.name}
          onOptimisticDelete={handleOptimisticDelete}
          formAction={formAction}
        />
       </td>
      </tr>
     ))}
    </tbody>
   </table>
  </div>
 )
}