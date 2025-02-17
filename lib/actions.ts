"use server"

import { instantReplyResponseSchema } from "@/types/interface"
import { revalidatePath } from "next/cache"

// import { auth, clerkClient } from "@clerk/nextjs/server"

// // ! NOT USING THIS ACTION AS OF NOW, CLERK ONBOARDING ROUTING IS NOT WORKING WITH MIDDLEWARE CURRENTLY

// interface onboardingProps{
//   username: string
//   companyName: string
// }

// export const completeOnboarding = async ({username, companyName}: onboardingProps) => {
//   const { userId } = auth()

//   if (!userId) {
//     return { message: "No Logged In User" }
//   }

//   try {
//     const res = await clerkClient.users.updateUser(userId, {
//       publicMetadata: {
//         onboardingComplete: true,
//         userName: username,
//         companyName: companyName,
//       },
//     })
//     return { message: res.publicMetadata }
//   } catch (err) {
//     return { error: "There was an error updating the user metadata." }
//   }
// }

export async function deleteMailbox(id: string) {
  try {
    const response = await fetch(`${process.env.BASE_API_URL}/email-address/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      return { error: `Error: ${response.statusText}`, success: false }
    }

    const result = await response.json()
    return { success: true, result }
  } catch (error) {
    return { error: error, success: false }
  }
}

export async function editMailboxInfo(id: any, editData: any) {
  try {
    const url = `${process.env.BASE_API_URL}/user/email-address/${id}`
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    })

    if (response.ok) {
      // toast.success("Data saved successfully!")
      revalidatePath("/dashboard/mailbox")
      return { message: "success" }
    } else {
      const err: any = await response.json()
      return err
      // toast.error(`Failed to save data: ${errorData.message || response.statusText}`)
    }
  } catch (error) {
    return error
    // toast.error("An error occurred while saving data.")
  }
}

export async function submitBlocklisted(data: string[]) {
  try {
    const response = await fetch("http://localhost:3000/uploadblacklisted/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword: data }),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const result = await response.json()
    console.log("Success:", result)
    return result
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}
export async function submitJobTitles(data: string[]) {
  try {
    const response = await fetch("http://localhost:3000/uploadjobtitles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ locations: data }),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const result = await response.json()
    console.log("Success:", result)
    return result
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}

export async function submitKeywords(data: string[]) {
  try {
    const response = await fetch("http://localhost:3000/uploadkeywords/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword: data }),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const result = await response.json()
    console.log("Success:", result)
    return result
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}

export async function submitLocations(data: string[]) {
  try {
    const response = await fetch("http://localhost:3000/uploadlocation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ locations: data.join(",") }),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const result = await response.json()
    console.log("Success:", result)
    return result
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}
export async function submitReplyContent(text: string, threadId: string, ccEmails?: string[]) {
  try {
    const requestBody: Record<string, any> = {
      reply: text,
      threadId: threadId,
    }

    if (ccEmails && ccEmails.length > 0) {
      requestBody.cc = ccEmails
    }

    const response = await fetch(`${process.env.BASE_API_URL}/emails/reply/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const result = await response.json()
    return instantReplyResponseSchema.parse(result)
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}
