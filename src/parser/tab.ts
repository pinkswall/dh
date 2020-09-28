export const tab = (content: string): object[] => {
  const lines = content.split("\n")
  const header = lines[0].split(`\t`)
  header[0] = `NAME`
  const result: object[] = []
  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(`\t`)
    for (let j = 0; j < header.length; j++) {
      const key = header[j]
      const value = currentLine[j]
      result.push({ [key]: value })
    }
  }
  return result
}
