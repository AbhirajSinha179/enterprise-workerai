"use server"
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
