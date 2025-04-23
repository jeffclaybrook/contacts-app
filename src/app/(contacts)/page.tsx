/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { decrypt } from "@/lib/encryption"
import { deleteContact } from "@/lib/actions"
import { Add } from "@/components/icons"
import Link from "next/link"
import prisma from "@/lib/prisma"
import EmptyState from "@/components/empty-state"
import Navbar from "@/components/navbar"
import Pagination from "@/components/pagination"
import Table from "@/components/table"

const PAGE_SIZE = 5

export default async function Home({ searchParams }: { searchParams: any }) {
  const { userId } = await auth()

  if (!userId) redirect("/sign-in")

  const page = Number(searchParams?.page) || 1
  const query = (searchParams?.query as string)?.toLowerCase() || ""
  const sort = (searchParams?.sort as string) === "desc" ? "desc" : "asc"

  const allContacts = await prisma.contact.findMany({
    where: { userId },
    orderBy: { name: sort }
  })

  const decryptedContacts = allContacts.map((c) => ({
    ...c,
    name: decrypt(c.name),
    phone: decrypt(c.phone),
    email: decrypt(c.email)
  }))

  const filtered = query
    ? decryptedContacts.filter((c) =>
      [c.name, c.phone, c.email].some((field) =>
        field.toLowerCase().includes(query)
      )
    )
    : decryptedContacts

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <>
      <Navbar />
      <main className="p-4">
        {filtered.length > 0 ? (
          <>
            <Table initialContacts={paginated} formAction={deleteContact} />
            <div className="flex items-center justify-center mt-6">
              <Pagination totalPages={totalPages} />
            </div>
          </>
        ) : (
          <EmptyState
            message={
              query
                ? `No results found for ${query}`
                : "You haven't added any contacts yet"
            }
          />
        )}
      </main>
      <Link
        href={"/create"}
        aria-label="Create contact"
        className="flex items-center justify-center gap-1 fixed bottom-8 right-8 bg-sky-800 text-white p-4 lg:px-6 rounded-xl shadow-lg cursor-pointer hover:bg-sky-950 transition"
      >
        <Add />
        <span className="hidden lg:flex">Create</span>
      </Link>
    </>
  )
}