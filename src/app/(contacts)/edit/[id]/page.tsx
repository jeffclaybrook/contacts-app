import { redirect } from "next/navigation"
import { editContact } from "@/lib/actions"
import { decrypt } from "@/lib/encryption"
import prisma from "@/lib/prisma"
import Form from "@/components/form"
import Navbar from "@/components/navbar"

export default async function Edit({ params }: { params: Promise<{ id: string }>}) {
 const { id } = await params

 const contact = await prisma.contact.findUnique({
  where: { id: id }
 })

 if (!contact) redirect("/")

 const decryptedContact = {
  ...contact,
  name: decrypt(contact.name),
  phone: decrypt(contact.phone),
  email: decrypt(contact.email)
 }
 
 const updateAction = editContact.bind(null, id)

 return (
  <>
   <Navbar />
   <main className="p-4">
    <h1 className="text-slate-700 dark:text-slate-50 text-2xl text-center mb-8">Edit Contact</h1>
    <form
     action={updateAction}
     className="flex flex-col gap-6 max-w-md mx-auto"
    >
     <Form initialData={decryptedContact} />
    </form>
   </main>
  </>
 )
}