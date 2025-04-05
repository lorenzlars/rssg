export default function<T> (jsonString: string): T | null {
  try {
    return JSON.parse(jsonString)
  } catch {
    return null
  }
}
