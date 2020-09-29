/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

import fs from "fs"
import prop from "./src/parser/prop"

const langs = [`de`, `fr`, `it`, `pt`, `ru`] //langs without `es` and CJK
const CJK_langs = ["zh-hans", "zh-hant", "ko", "ja"]
const files = [`Items`, `Units`, "Campaign"]
const localesPath = `./src/data/locales`

function data2json(readPath: string, writePath: string) {
  const content: string = fs.readFileSync(readPath, "utf8")
  const parsed = prop(content)
  fs.writeFileSync(writePath, parsed, "utf8")
}

exports.onPreBootstrap = () => {
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

  for (let i = 0; i < CJK_langs.length; i++) {
    const lang = CJK_langs[i]

    for (let j = 0; j < files.length; j++) {
      const file = files[j]

      if (lang == "zh-hans") {
        const fileLang = `zh-Hans`
        console.log(file)
        if (file == "Campaign") {
          console.log("FILE IS CAMPAIGN!!!!!" + ` AND FILE IS ${file}`)
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
