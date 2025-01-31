export const checkHealth = async (): Promise<boolean> => {
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
  try {
    await delay(5000)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/health`)
    return res.status === 200
  } catch {
    return false
  }
}
