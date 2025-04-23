import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { createContact } from "@/lib/actions"
import Form from "@/components/form"
import Navbar from "@/components/navbar"

export default async function Create() {
 const { userId } = await auth()

 if (!userId) redirect("/sign-in")

 return (
  <>
   <Navbar />
   <main className="p-4">
    <h1 className="text-slate-700 dark:text-slate-50 text-2xl text-center mb-8">Create Contact</h1>
    <form
     action={createContact}
     className="flex flex-col gap-6 max-w-md w-full mx-auto"
    >
     <Form />
    </form>
   </main>
  </>
 )
}