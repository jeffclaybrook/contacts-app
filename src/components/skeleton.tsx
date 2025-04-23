export default function Skeleton() {
 return (
  <div className="relative overflow-x-auto">
   <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
     <tr>
      <th scope="col" className="px-6 py-3">Name</th>
      <th scope="col" className="px-6 py-3">Phone</th>
      <th scope="col" className="px-6 py-3">Email</th>
      <th scope="col" className="px-6 py-3">Created At</th>
      <th scope="col" className="px-6 py-3">Actions</th>
     </tr>
    </thead>
    <tbody className="animate-pulse">
     <tr className="bg-base border-b border-base-50">
      <td className="py-3 px-6">
       <span className="h-4 w-32 rounded bg-base-200" />
      </td>
      <td className="py-3 px-6">
       <span className="h-4 w-20 rounded bg-base-200" />
      </td>
      <td className="py-3 px-6">
       <span className="h-4 w-32 rounded bg-base-200" />
      </td>
      <td className="flex justify-center gap-1 py-3">
       <span className="h-7 w-7 rounded-sm bg-base-200" />
       <span className="h-7 w-7 rounded-sm bg-base-200" />
      </td>
     </tr>
     <tr className="bg-base border-b border-base-50">
      <td className="py-3 px-6">
       <span className="h-4 w-32 rounded bg-base-200" />
      </td>
      <td className="py-3 px-6">
       <span className="h-4 w-20 rounded bg-base-200" />
      </td>
      <td className="py-3 px-6">
       <span className="h-4 w-32 rounded bg-base-200" />
      </td>
      <td className="flex justify-center gap-1 py-3">
       <span className="h-7 w-7 rounded-sm bg-base-200" />
       <span className="h-7 w-7 rounded-sm bg-base-200" />
      </td>
     </tr>
     <tr className="bg-base border-b border-base-50">
      <td className="py-3 px-6">
       <span className="h-4 w-32 rounded bg-base-200" />
      </td>
      <td className="py-3 px-6">
       <span className="h-4 w-20 rounded bg-base-200" />
      </td>
      <td className="py-3 px-6">
       <span className="h-4 w-32 rounded bg-base-200" />
      </td>
      <td className="flex justify-center gap-1 py-3">
       <span className="h-7 w-7 rounded-sm bg-base-200" />
       <span className="h-7 w-7 rounded-sm bg-base-200" />
      </td>
     </tr>
     <tr className="bg-base border-b border-base-50">
      <td className="py-3 px-6">
       <span className="h-4 w-32 rounded bg-base-200" />
      </td>
      <td className="py-3 px-6">
       <span className="h-4 w-20 rounded bg-base-200" />
      </td>
      <td className="py-3 px-6">
       <span className="h-4 w-32 rounded bg-base-200" />
      </td>
      <td className="flex justify-center gap-1 py-3">
       <span className="h-7 w-7 rounded-sm bg-base-200" />
       <span className="h-7 w-7 rounded-sm bg-base-200" />
      </td>
     </tr>
     <tr className="bg-base border-b border-base-50">
      <td className="py-3 px-6">
       <span className="h-4 w-32 rounded bg-base-200" />
      </td>
      <td className="py-3 px-6">
       <span className="h-4 w-20 rounded bg-base-200" />
      </td>
      <td className="py-3 px-6">
       <span className="h-4 w-32 rounded bg-base-200" />
      </td>
      <td className="flex justify-center gap-1 py-3">
       <span className="h-7 w-7 rounded-sm bg-base-200" />
       <span className="h-7 w-7 rounded-sm bg-base-200" />
      </td>
     </tr>
    </tbody>
   </table>
  </div>
 )
}