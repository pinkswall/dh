/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

import { CreatePagesArgs } from "gatsby"
import { readFileSync, writeFileSync } from "fs"
import path from "path"
import prop from "./src/parser/prop"
import tab from "./src/parser/tab"
import generateBadgesObject from "./generateBadgesObject"

const langs = [`de`, `fr`, `it`, `pt`, `ru`] //langs without `es` and CJK
const CJK_langs = ["ko", "ja", "zh-hans", "zh-hant"]
const propFiles = [`Items`, `Units`, "Campaign"]
const tabFiles = [`items`, `normal_campaign`, `normal_gear`]
const dataPath = `./src/data`

function prop2object(readPath: string) {
  const content: string = readFileSync(readPath, "utf8")
  return prop(content)
}

function tab2object(readPath: string) {
  const content: string = readFileSync(readPath, "utf8")
  return tab(content)
}

function object2json(object: object, writePath: string) {
  writeFileSync(writePath, JSON.stringify(object, null, 2), "utf8")
}

function json2object(readPath: string) {
  return JSON.parse(readFileSync(readPath, "utf8"))
}

exports.onPreBootstrap = () => {
  console.log("Start to parse locales ...")

  const locales: { [lang: string]: { [name: string]: string } } = {}

  for (let i = 0; i < langs.length; i++) {
    const lang = langs[i]
    for (let j = 0; j < propFiles.length; j++) {
      const file = propFiles[j]
      locales[lang] = prop2object(`./data/${lang}/${file}_${lang}.properties`)
    }
    console.log(`${lang} parsed`)
  }

  for (let i = 0; i < CJK_langs.length; i++) {
    const lang = CJK_langs[i]

    for (let j = 0; j < propFiles.length; j++) {
      const file = propFiles[j]

      if (lang == "zh-hans") {
        const fileLang = `zh-Hans`
        if (file == "Campaign") {
          locales[lang] = prop2object(
            `./data/${lang}/CampaignCJK_${fileLang}.properties`
          )
          continue
        }
        locales[lang] = prop2object(
          `./data/${lang}/${file}_${fileLang}.properties`
        )
        continue
      }

      if (lang == "zh-hant") {
        const fileLang = `zh-Hant`
        if (file == "Campaign") {
          locales[lang] = prop2object(
            `./data/${lang}/CampaignCJK_${fileLang}.properties`
          )
          continue
        }
        locales[lang] = prop2object(
          `./data/${lang}/${file}_${fileLang}.properties`
        )
        continue
      }

      if (file === "Campaign") {
        locales[lang] = prop2object(
          `./data/${lang}/CampaignCJK_${lang}.properties`
        )
        continue
      }
      locales[lang] = prop2object(`./data/${lang}/${file}_${lang}.properties`)
      continue
    }

    console.log(`${lang} parsed`)
  }

  for (let i = 0; i < propFiles.length; i++) {
    const file = propFiles[i]
    locales[`es`] = prop2object(`./data/es/${file}.properties`)
  }

  console.log(`es parsed`)
  console.log(`Every locales is parsed !`)

  const tabs: {
    [tabFileName: string]: { [name: string]: { [key: string]: string } }
  } = {}

  for (let i = 0; i < tabFiles.length; i++) {
    const file = tabFiles[i]
    tabs[file] = tab2object(`./data/${file}.tab`)
  }

  console.log(`All .tab files are parsed !`)
  console.log(`Prepare to create locales...`)

  const badges = generateBadgesObject(locales, tabs)
  object2json(badges, `${dataPath}/badges.json`)

  console.log("prepared")

  console.log(`Badges number: ${Object.keys(badges).length}`)
}

export async function createPages({ actions }: CreatePagesArgs) {
  const { createPage } = actions
  const badges = json2object("./src/data/badges.json")

  for (let badge in badges) {
    createPage({
      path: badge,
      component: path.resolve("./src/templates/BadgeTemplate.tsx"),
      context: badges[badge],
    })
  }
}
