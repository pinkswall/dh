/**
 *
 * @return {name1: { key1: value1, key2: value2 }}
 *
 */
const tab = (content: string) => {
  const lines = content.split("\n")
  const header = lines[0].split("\t")
  const result: { [name: string]: { [key: string]: string } } = {}
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] == "") continue
    const currentLine = lines[i].split("\t")
    for (let j = 1; j < header.length; j++) {
      const name = currentLine[0]
      const key = header[j]
      const value = currentLine[j]
      if (result[name]) {
        result[name][key] = value
        continue
      }
      result[name] = { [key]: value }
    }
  }
  return result
  // return JSON.stringify(result, null, 4)
}

export default tab
