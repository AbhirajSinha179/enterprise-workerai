import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export default function TalkToSalesPage() {
  return (
    <div className="min-h-[80vh] container">
      <div className="mx-auto mt-12 flex min-h-[60vh] w-full flex-col items-center justify-center gap-4 max-w-6xl">
        <h1 className="my-4 text-7xl font-bold">Talk to Sales</h1>
        <p className="mb-12 text-lg">
          To get access to the dashboard, contact sales via{" "}
          <Link href="mail:rohit@workerai.co" className="underline-animated font-bold">
            email
          </Link>{" "}
          or{" "}
          <Link href={"https://www.calendly.com/rohit_workerai"} className="underline-animated font-bold">
            book a meeting
          </Link>
        </p>
        <Link href="/dashboard">
          <button className="relative inline-flex h-12 w-full items-center justify-center rounded-md bg-white px-6 font-medium text-gray-950 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
            <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
            <SignOutButton />
          </button>
        </Link>
      </div>{" "}
    </div>
  )
}
