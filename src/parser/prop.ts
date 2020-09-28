export const prop = (content: string): object => {
  const lines = content.split("\n")
  const result: { [key: string]: string } = {}
  for (let i = 0; i < lines.length; i++) {
    let currentLine = lines[i]
    if (currentLine == "" || currentLine[0] == "#") continue
    let key = currentLine.split(`=`)[0]
    let value = currentLine.split(`=`)[1]
    result[key] = value
  }
  return result
}
