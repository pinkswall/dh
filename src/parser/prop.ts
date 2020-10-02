/**
 *
 * @return { key1: value1, key2: value2 }
 *
 */
const prop = (content: string) => {
  const lines = content.split("\n")
  const result: { [key: string]: string } = {}
  for (let i = 0; i < lines.length; i++) {
    let currentLine = lines[i].trim()
    if (currentLine == "" || currentLine[0] == "#") continue
    let key = currentLine.split(`=`)[0]
    let value = currentLine.split(`=`)[1]
    result[key] = value
  }
  return result
  // return JSON.stringify(result, null, 4)
}

export default prop
