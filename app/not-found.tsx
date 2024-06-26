/**
 * v0 by Vercel.
 * @see https://v0.dev/t/znMNf0cjDWv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"

export default function Component() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 flex flex-col items-center justify-center gap-4">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Error 404</div>
                    <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl">Page Not Found</h1>
                    <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                </div>
                <Link
                    href="/."
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    prefetch={false}
                >
                    Go to the homepage
                </Link>
            </main>
        </div>
    )
}
