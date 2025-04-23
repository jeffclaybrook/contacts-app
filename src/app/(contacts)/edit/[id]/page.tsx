import { redirect } from "next/navigation"
import { editContact } from "@/lib/actions"
import prisma from "@/lib/prisma"
import Form from "@/components/form"

export default async function Edit({ params }: { params: { id: string } }) {
 const contact = await prisma.contact.findUnique({
  where: { id: params.id }
 })

 if (!contact) redirect("/")
 
 const updateAction = editContact.bind(null, params.id)

 return (
  <main className="p-4">
   <h1 className="text-slate-700 dark:text-slate-50 text-2xl text-center mb-8">Edit Contact</h1>
   <form
    action={updateAction}
    className="flex flex-col gap-6 max-w-md mx-auto"
   >
    <Form initialData={contact} />
   </form>
  </main>
 )
}