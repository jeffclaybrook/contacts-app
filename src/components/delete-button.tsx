"use client"

import { useRef, useState, useTransition } from "react"
import { Delete } from "./icons"

type DeleteButtonProps = {
 contactId: string
 contactName: string
 onOptimisticDelete: (id: string) => void
 formAction: (formData: FormData) => void
}

export default function DeleteButton({ contactId, contactName, onOptimisticDelete, formAction }: DeleteButtonProps) {
 const [open, setOpen] = useState<boolean>(false)
 const [isPending, startTransition] = useTransition()
 const formRef = useRef<HTMLFormElement>(null)

 const handleConfirm = () => {
  setOpen(false)
  onOptimisticDelete(contactId)
  startTransition(() => {
   formRef.current?.requestSubmit()
  })
 }

 return (
  <>
   <button
    onClick={() => setOpen(true)}
    aria-label="Delete contact"
    className="text-slate-700 dark:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded-full cursor-pointer transition"
   >
    <Delete />
   </button>
   {open && (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
     <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-medium mb-2 text-slate-700 dark:text-slate-50">Delete Contact</h2>
      <p className="text-slate-500 dark:text-slate-200 mb-4">Are you sure you want to delete <strong>{contactName}</strong>?</p>
      <div className="flex items-center justify-end gap-4">
       <button
        onClick={() => setOpen(false)}
        aria-label="Cancel"
        className="text-gray-500 cursor-pointer transition hover:text-gray-700 px-4 py-2"
       >
        Cancel
       </button>
       <button
        onClick={handleConfirm}
        aria-label="Delete contact"
        className="inline-flex items-center gap-1 bg-red-500 text-white hover:bg-red-700 py-2 px-4 rounded-xl shadow-lg cursor-pointer transition"
       >
        {isPending ? "Deleting..." : <><Delete /> Delete</>}
       </button>
      </div>
     </div>
    </div>
   )}
   <form
    ref={formRef}
    action={formAction}
    className="hidden"
   >
    <input type="hidden" name="id" value={contactId} />
   </form>
  </>
 )
}