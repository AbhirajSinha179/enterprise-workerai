"use client"

import { useUser } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { completeOnboarding } from "@/lib/actions"



const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
})

export default function InputForm() {
  const { user } = useUser()
  const router = useRouter()


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      companyName: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const res = await completeOnboarding(data)
    if (res?.message) {
      await user?.reload()
      router.push("/dashboard")
    }
    if (res?.error) {
      // toast(res?.error, { type: "error" })
      console.log(res?.error);
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter user name" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter company name" {...field} />
              </FormControl>
              <FormDescription>This is your organisation&apos;s name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
          </div>
  )
}

// export default function OnboardingComponent() {
//   const [error, setError] = React.useState("")
//   const { user } = useUser()
//   const router = useRouter()

//   const handleSubmit = async (formData: FormData) => {
//     const res = await completeOnboarding(formData)
//     if (res?.message) {
//       await user?.reload()
//       router.push("/")
//     }
//     if (res?.error) {
//       setError(res?.error)
//     }
//   }
//   return (
//     <div className="w-screen h-screen flex items-center justify-center">
//       <form action={handleSubmit}>
//         {/* <div>
//           <label>Your Name</label>
//           <p>Enter your full name.</p>
//           <input type="text" name="userName" required />
//         </div>

//         <div>
//           <label>Company Name</label>
//           <p>Enter the name of your Company</p>
//           <input type="text" name="applicationType" required />
//         </div>
//         {error && <p className="text-red-600">Error: {error}</p>}
//         <button type="submit">Submit</button> */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Welcome</CardTitle>
//           <CardDescription>Add your name and company name here. Click save when you&apos;re done.</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           <div className="space-y-1">
//             <Label htmlFor="name">Name</Label>
//             <Input id="name" name="userName" placeholder="Your Name" required/>
//           </div>
//           <div className="space-y-1">
//             <Label htmlFor="company">Company Name</Label>
//             <Input id="username" name="companyName" placeholder="Your Company" required />
//           </div>
//         </CardContent>
//         <CardFooter>
//           <Button type="submit" onClick={() => handleSubmit}>Save changes</Button>
//         </CardFooter>
//       </Card>
//       </form>
//     </div>
//   )
// }
