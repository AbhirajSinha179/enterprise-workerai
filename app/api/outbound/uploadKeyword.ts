"use server"

export async function submitkeywords(data: string[]) {
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
