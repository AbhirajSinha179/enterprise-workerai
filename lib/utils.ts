import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// //Add open rate logic here, check for total Emails being 0 and decimal places beforehand
// export const getOpenRate = ({ total_opens, totalUniqueEmails }: { total_opens: any; totalUniqueEmails: number }) => {
//   return total_opens
// }

// // similar with response rate

export const getOpenRate = ({ total_opens, total_emails }: { total_opens: number; total_emails: number }) => {
  if (total_emails === 0) return 0 // Avoid division by zero
  return ((total_opens / total_emails) * 100).toFixed(2) // Convert to percentage and format with 2 decimal places
}

export const getResponseRate = ({
  total_replies,
  totalUniqueEmails,
}: {
  total_replies: number
  totalUniqueEmails: number
}) => {
  if (totalUniqueEmails === 0) return 0 // Avoid division by zero
  return ((total_replies / totalUniqueEmails) * 100).toFixed(2) // Convert to percentage and format with 2 decimal places
}
