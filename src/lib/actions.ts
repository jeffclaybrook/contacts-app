"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import { encrypt } from "./encryption"
import prisma from "./prisma"

export async function createContact(formData: FormData) {
 const { userId } = await auth()

 if (!userId) throw new Error("Unauthorized")
 
 const name = encrypt(formData.get("name")?.toString().trim() || "")
 const phone = encrypt(formData.get("phone")?.toString().replace(/\D/g, "") || "")
 const email = encrypt(formData.get("email")?.toString().trim() || "")

 if (!name || !phone || !email) {
  throw new Error("All fields are required")
 }

 await prisma.contact.create({
  data: {
   name,
   phone,
   email,
   userId
  }
 })

 revalidatePath("/")
 redirect("/")
}

export async function editContact(id: string, formData: FormData) {
 const { userId } = await auth()

 if (!userId) throw new Error("Unauthorized")

 const name = encrypt(formData.get("name") as string)
 const phone = encrypt(formData.get("phone") as string)
 const email = encrypt(formData.get("email") as string)

 await prisma.contact.update({
  where: {
   id
  },
  data: {
   name,
   phone,
   email
  }
 })

 revalidatePath("/")
 redirect("/")
}

export async function deleteContact(formData: FormData) {
 const { userId } = await auth()

 if (!userId) throw new Error("Unauthorized")

 const id = formData.get("id") as string
 
 await prisma.contact.delete({
  where: {
   id
  }
 })

 revalidatePath("/")
}