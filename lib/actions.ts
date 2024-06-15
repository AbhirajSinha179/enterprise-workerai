// "use server"
import { auth, clerkClient } from "@clerk/nextjs/server"

// ! NOT USING THIS ACTION AS OF NOW, CLERK ONBOARDING ROUTING IS NOT WORKING WITH MIDDLEWARE CURRENTLY

interface onboardingProps{
  username: string
  companyName: string
}

export const completeOnboarding = async ({username, companyName}: onboardingProps) => {
  const { userId } = auth()

  if (!userId) {
    return { message: "No Logged In User" }
  }

  try {
    const res = await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        userName: username,
        companyName: companyName,
      },
    })
    return { message: res.publicMetadata }
  } catch (err) {
    return { error: "There was an error updating the user metadata." }
  }
}
