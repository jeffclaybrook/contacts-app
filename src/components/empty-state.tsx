import { Empty } from "./icons"

export default function EmptyState({ message }: { message: string }) {
 return (
  <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500 dark:text-slate-200 overflow-hidden">
   <Empty />
   <p className="mt-8">{message}</p>
  </div>
 )
}