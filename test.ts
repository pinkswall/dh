/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

import fs from "fs"
import prop from "./src/parser/prop"

const langs = [`de`, `fr`, `it`, `pt`, `ru`] //langs without `es` and CJK
const CJK_langs = ["ko", "ja", "zh-hans", "zh-hant"]
const files = [`Items`, `Units`, "Campaign"]
const localesPath = `./src/data/locales`

function data2json(readPath: string, writePath: string) {
  console.log(`IN THE FUNC data2json`)
  console.log(readPath)
  console.log(`FUNC ENDED`)
  const content: string = fs.readFileSync(readPath, "utf8")
  const parsedContent = prop(content)
  fs.writeFileSync(writePath, parsedContent, "utf8")
}

const test = () => {
  console.log("Start to generate locales!")

  for (let i = 0; i < langs.length; i++) {
    const lang = langs[i]
    for (let j = 0; j < files.length; j++) {
      const file = files[j]
      data2json(
        `./src/data/${lang}/${file}_${lang}.properties`,
        `${localesPath}/${file}_${lang}.json`
      )
    }
    console.log(`${lang} generated`)
  }

  console.log(`Locales without CJK generated !`)

  for (let p = 0; p < CJK_langs.length; p++) {
    const lang = CJK_langs[p]

    for (let q = 0; q < files.length; q++) {
      const file = files[q]

      if (lang == "zh-hans") {
        const fileLang = `zh-Hans`
        if (file == "Campaign") {
          console.log(`./src/data/${lang}/CampaignCJK_${fileLang}.properties`)
          data2json(
            `./src/data/${lang}/CampaignCJK_${fileLang}.properties`,
            `${localesPath}/${file}_${lang}.json`
          )
        }
        data2json(
          `./src/data/${lang}/${file}_${fileLang}.properties`,
          `${localesPath}/${file}_${lang}.json`
        )
      }

      if (lang == "zh-hant") {
        const fileLang = `zh-Hant`
        if (file == "Campaign") {
          data2json(
            `./src/data/${lang}/CampaignCJK_${fileLang}.properties`,
            `${localesPath}/${file}_${lang}.json`
          )
        }
        data2json(
          `./src/data/${lang}/${file}_${fileLang}.properties`,
          `${localesPath}/${file}_${lang}.json`
        )
      }

      if (file === "Campaign") {
        data2json(
          `./src/data/${lang}/CampaignCJK_${lang}.properties`,
          `${localesPath}/${file}_${lang}.json`
        )
      }
      data2json(
        `./src/data/${lang}/${file}_${lang}.properties`,
        `${localesPath}/${file}_${lang}.json`
      )
    }

    console.log(`${lang} generated`)
  }
}

test()
